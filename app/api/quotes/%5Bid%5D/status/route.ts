import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
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
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        job: {
          include: { customer: true }
        }
      }
    });

    if (!quote) {
      return new NextResponse("Quote not found", { status: 404 });
    }

    // Only the customer who posted the job can accept/reject quotes
    if (quote.job.customer.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedQuote = await prisma.quote.update({
      where: { id: params.id },
      data: { status }
    });

    // If a quote is accepted, update the job status to ASSIGNED
    if (status === "ACCEPTED") {
      await prisma.job.update({
        where: { id: quote.jobId },
        data: { status: "ASSIGNED" }
      });

      // Optionally: Reject all other pending quotes for this job
      await prisma.quote.updateMany({
        where: {
          jobId: quote.jobId,
          id: { not: params.id },
          status: "PENDING"
        },
        data: { status: "REJECTED" }
      });
    }

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error("[QUOTE_STATUS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
