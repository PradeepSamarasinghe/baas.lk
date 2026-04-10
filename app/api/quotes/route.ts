import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Must be a worker to submit a quote
    const workerProfile = await prisma.workerProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!workerProfile) {
      return new NextResponse("Worker profile not found. You must be a worker to submit a quote.", { status: 403 });
    }

    const body = await req.json();
    const { jobId, amount, description } = body;

    if (!jobId || !amount) {
      return new NextResponse("Job ID and Amount are required", { status: 400 });
    }

    // Check if worker already quoted on this job
    const existingQuote = await prisma.quote.findUnique({
      where: {
        jobId_workerId: {
          jobId,
          workerId: workerProfile.id,
        }
      }
    });

    if (existingQuote) {
      return new NextResponse("You have already submitted a quote for this job.", { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        jobId,
        workerId: workerProfile.id,
        amount: parseFloat(amount),
        description,
        status: "PENDING"
      }
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error("[QUOTES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
