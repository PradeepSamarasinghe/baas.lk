import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { trade, district, baseRate, experience } = body;

    if (!trade || !district) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upsert the worker profile for the authenticated user
    const workerProfile = await prisma.workerProfile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        trade,
        district,
        baseRate: baseRate ? parseFloat(baseRate) : null,
        experience,
      },
      create: {
        userId: session.user.id as string,
        trade,
        district,
        baseRate: baseRate ? parseFloat(baseRate) : null,
        experience,
      },
    });

    // Update the user's role to WORKER if not already set
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "WORKER" },
    });

    return NextResponse.json(workerProfile);
  } catch (error) {
    console.error("[WORKER_PROFILE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
