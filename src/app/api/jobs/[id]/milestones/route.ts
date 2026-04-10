import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const milestones = await db.milestone.findMany({
      where: { jobId: id },
      orderBy: { order: "asc" }
    });

    return NextResponse.json(milestones);
  } catch (error) {
    console.error("[MILESTONES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
