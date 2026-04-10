import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; milestoneId: string }> }
) {
  try {
    const { id, milestoneId } = await params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { status, proofUrl } = body; // SUBMITTED, APPROVED, PAID

    if (!["SUBMITTED", "APPROVED", "PAID"].includes(status)) {
      return new NextResponse("Invalid status transition", { status: 400 });
    }

    // Identify the user's role in this job
    const [workerProfile, customerProfile] = await Promise.all([
      db.workerProfile.findUnique({ where: { userId: session.user.id } }),
      db.customerProfile.findUnique({ where: { userId: session.user.id } }),
    ]);

    // Role-based authorization
    if (status === "SUBMITTED") {
      // Worker logic
      if (!workerProfile) return new NextResponse("Forbidden", { status: 403 });
      
      const isAssigned = await db.quote.findFirst({
        where: { jobId: id, workerId: workerProfile.id, status: "ACCEPTED" }
      });
      if (!isAssigned) return new NextResponse("Not assigned to this job", { status: 403 });

      const updated = await db.milestone.update({
        where: { id: milestoneId },
        data: { status: "SUBMITTED", proofUrl }
      });
      return NextResponse.json(updated);
    } 
    
    if (status === "APPROVED" || status === "PAID") {
      // Customer logic
      if (!customerProfile) return new NextResponse("Forbidden", { status: 403 });

      const job = await db.job.findUnique({
        where: { id },
        include: { milestones: true }
      });

      if (!job || job.customerId !== customerProfile.id) {
        return new NextResponse("Not your job", { status: 403 });
      }

      const updated = await db.milestone.update({
        where: { id: milestoneId },
        data: { status }
      });

      // Special Logic: If ALL milestones are PAID, mark job as COMPLETED
      if (status === "PAID") {
        const remainingMilestones = job.milestones.filter(
          (m) => m.id !== milestoneId && m.status !== "PAID"
        );
        if (remainingMilestones.length === 0) {
          await db.job.update({
            where: { id },
            data: { status: "COMPLETED" }
          });
        }
      }

      return NextResponse.json(updated);
    }

    return new NextResponse("Unsupported operation", { status: 400 });
  } catch (error) {
    console.error("[MILESTONE_SUBMIT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
