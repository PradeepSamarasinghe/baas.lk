import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle2 } from "lucide-react";
import ActiveJobCard from "../../../components/jobs/ActiveJobCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  // Get profile to determine role
  const [workerProfile, customerProfile] = await Promise.all([
    db.workerProfile.findUnique({ where: { userId: session.user.id } }),
    db.customerProfile.findUnique({ where: { userId: session.user.id } }),
  ]);

  const role = workerProfile ? "WORKER" : customerProfile ? "CUSTOMER" : null;

  // Fetch Active Jobs - only if we have a valid role and profile
  const activeJobs = role ? await db.job.findMany({
    where: {
      status: { in: ["ASSIGNED", "IN_PROGRESS"] },
      ...(role === "CUSTOMER" && customerProfile
        ? { customerId: customerProfile.id } 
        : role === "WORKER" && workerProfile
        ? { quotes: { some: { workerId: workerProfile.id, status: "ACCEPTED" } } }
        : { id: "none" } // Should not happen given the role check
      )
    },
    include: {
      customer: true,
      milestones: {
        orderBy: { order: "asc" }
      },
      quotes: {
        where: { status: "ACCEPTED" },
        include: { worker: true }
      }
    },
    orderBy: { updatedAt: "desc" }
  }) : [];

  return (
    <div className="space-y-6 text-foreground">
      <div>
        <h1 className="text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user.name || "User"}. You have {activeJobs.length} active jobs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">LKR 0</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold font-display">Active Job Tracking</h2>
        {activeJobs.length === 0 ? (
          <Card className="py-12 border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No active jobs found.</p>
              <p className="text-sm text-muted-foreground mt-1">
                {role === "CUSTOMER" 
                  ? "Post a job or accept a quote to get started." 
                  : "Submit quotes to available jobs to start working."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {activeJobs.map((job) => (
              <ActiveJobCard key={job.id} job={job} userRole={role!} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
