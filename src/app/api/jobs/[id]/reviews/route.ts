import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const customerProfile = await db.customerProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!customerProfile) {
      return new NextResponse("Customer profile not found", { status: 403 });
    }

    const job = await db.job.findUnique({
      where: { id },
      include: { 
        quotes: { where: { status: "ACCEPTED" } }
      }
    });

    if (!job || job.customerId !== customerProfile.id) {
      return new NextResponse("Job not found or not owned by you.", { status: 404 });
    }

    if (job.status !== "COMPLETED") {
      return new NextResponse("Reviews can only be submitted for completed jobs.", { status: 400 });
    }

    const acceptedQuote = job.quotes[0];
    if (!acceptedQuote) {
      return new NextResponse("No assigned worker found for this job.", { status: 400 });
    }

    const body = await req.json();
    const { rating, comment } = body;

    if (!rating || rating < 1 || rating > 5) {
      return new NextResponse("Invalid rating. Must be between 1 and 5.", { status: 400 });
    }

    const review = await db.review.create({
      data: {
        jobId: id,
        workerId: acceptedQuote.workerId,
        customerId: customerProfile.id,
        rating,
        comment
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[JOB_REVIEW_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
