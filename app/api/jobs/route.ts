import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the customer profile associated with this user
    const customerProfile = await prisma.customerProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!customerProfile) {
      return new NextResponse("Customer profile not found. Please complete onboarding.", { status: 403 });
    }

    const body = await req.json();
    const { trade, description, budget, district, location } = body;

    if (!trade || !description || !district) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        customerId: customerProfile.id,
        trade,
        description,
        budget: budget ? parseFloat(budget) : null,
        district,
        location,
        status: "OPEN"
      }
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("[JOBS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trade = searchParams.get("trade");
    const district = searchParams.get("district");
    const status = searchParams.get("status") || "OPEN";

    const jobs = await prisma.job.findMany({
      where: {
        status: status as any,
        trade: trade ? trade : undefined,
        district: district ? district : undefined,
      },
      include: {
        customer: true,
        _count: {
          select: { quotes: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("[JOBS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
