import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trade = searchParams.get("trade");
    const district = searchParams.get("district");
    const verifiedOnly = searchParams.get("verified") === "true";

    const workers = await db.workerProfile.findMany({
      where: {
        status: verifiedOnly ? "VERIFIED" : undefined,
        trade: trade ? { has: trade } : undefined,
        district: district ? district : undefined,
      },
      include: {
        user: {
          select: {
            phoneNumber: true,
          }
        },
        _count: {
          select: { reviews: true }
        },
        reviews: {
          select: { rating: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const workersWithStats = workers.map(worker => {
      const avgRating = worker.reviews.length > 0
        ? worker.reviews.reduce((acc, r) => acc + r.rating, 0) / worker.reviews.length
        : 0;
      
      return {
        ...worker,
        averageRating: parseFloat(avgRating.toFixed(1)),
        reviewCount: worker._count.reviews
      };
    });

    return NextResponse.json(workersWithStats);
  } catch (error) {
    console.error("[WORKERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
