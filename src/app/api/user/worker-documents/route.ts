import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { type, url } = await req.json();

    if (!type || !url) {
      return new NextResponse("Missing document type or URL", { status: 400 });
    }

    let updateData = {};
    if (type === "NIC") updateData = { nicUrl: url, status: "PENDING" };
    if (type === "SELFIE") updateData = { selfieUrl: url, status: "PENDING" };
    if (type === "CERTIFICATE") {
      const profile = await db.workerProfile.findUnique({
        where: { userId: session.user.id },
        select: { certificates: true },
      });
      updateData = { 
        certificates: { set: [...(profile?.certificates || []), url] },
        status: "PENDING"
      };
    }

    const workerProfile = await db.workerProfile.update({
      where: { userId: session.user.id },
      data: updateData,
    });

    return NextResponse.json(workerProfile);
  } catch (error) {
    console.error("[UPLOAD_DOC_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
