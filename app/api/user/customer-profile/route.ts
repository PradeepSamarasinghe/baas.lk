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
    const { type, district } = body;

    if (!type || !district) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upsert the customer profile for the authenticated user
    const customerProfile = await prisma.customerProfile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        type,
        district,
      },
      create: {
        userId: session.user.id as string,
        type,
        district,
      },
    });

    // Update the user's role to CUSTOMER if not already set
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "CUSTOMER" },
    });

    return NextResponse.json(customerProfile);
  } catch (error) {
    console.error("[CUSTOMER_PROFILE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
