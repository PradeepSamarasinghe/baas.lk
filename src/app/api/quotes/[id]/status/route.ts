import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { status } = body; // ACCEPTED or REJECTED

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    // Get the quote to verify ownership of the job
    const quote = await db.quote.findUnique({
      where: { id: id },
      include: {
        job: {
          include: { customer: true }
        }
      }
    });

    if (!quote) {
      return new NextResponse("Quote not found", { status: 404 });
    }

    if (quote.job.customer.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedQuote = await db.quote.update({
      where: { id: id },
      data: { status }
    });

    if (status === "ACCEPTED") {
      const { milestones } = body; // Array of { title, amount }

      // 1. Transaction to ensure Atomicity
      await db.$transaction(async (tx) => {
        // Update Job Status
        await tx.job.update({
          where: { id: quote.jobId },
          data: { status: "ASSIGNED" }
        });

        // Reject other quotes
        await tx.quote.updateMany({
          where: {
            jobId: quote.jobId,
            id: { not: id },
            status: "PENDING"
          },
          data: { status: "REJECTED" }
        });

        // Create Milestones
        if (milestones && Array.isArray(milestones) && milestones.length > 0) {
          await tx.milestone.createMany({
            data: milestones.map((m: any, index: number) => ({
              jobId: quote.jobId,
              title: m.title,
              amount: parseFloat(m.amount),
              order: index,
              status: "PENDING"
            }))
          });
        } else {
          // Default to a single 100% milestone
          await tx.milestone.create({
            data: {
              jobId: quote.jobId,
              title: "Full Payment",
              amount: quote.amount,
              order: 0,
              status: "PENDING"
            }
          });
        }
      });
    }

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error("[QUOTE_STATUS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
