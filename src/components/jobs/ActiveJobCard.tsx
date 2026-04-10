"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ActiveJobCardProps {
  job: any;
  userRole: "WORKER" | "CUSTOMER";
}

export default function ActiveJobCard({ job, userRole }: ActiveJobCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const milestones = job.milestones || [];
  const paidMilestones = milestones.filter((m: any) => m.status === "PAID");
  const progress = milestones.length > 0 
    ? (paidMilestones.length / milestones.length) * 100 
    : 0;

  const currentMilestone = milestones.find((m: any) => 
    m.status === "PENDING" || m.status === "SUBMITTED" || m.status === "APPROVED"
  );

  const handleUpdateMilestone = async (milestoneId: string, status: string) => {
    try {
      setLoading(milestoneId);
      const res = await fetch(`/api/jobs/${job.id}/milestones/${milestoneId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error("Failed to update milestone");

      toast.success(`Milestone updated to ${status}`);
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-primary/10 hover:border-primary/20 transition-all shadow-glow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20">
        <div className="space-y-1">
          <CardTitle className="text-xl font-display font-bold">
            {job.description.split('\n')[0].substring(0, 50)}...
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <span className="capitalize">{job.trade.toLowerCase()}</span>
            <span>•</span>
            <span>{job.district}</span>
          </CardDescription>
        </div>
        <Badge variant={job.status === "ASSIGNED" ? "secondary" : "default"} className="font-semibold uppercase tracking-wider px-3 py-1">
          {job.status}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Focus */}
        {currentMilestone ? (
          <div className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground italic">Current Milestone</span>
              <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter">
                {currentMilestone.status}
              </Badge>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground leading-tight">{currentMilestone.title}</h4>
                <p className="text-sm font-display font-black text-secondary">LKR {parseFloat(currentMilestone.amount).toLocaleString()}</p>
              </div>
              
              {/* Actions Based on Role & Status */}
              <div className="flex gap-2">
                {userRole === "WORKER" && currentMilestone.status === "PENDING" && (
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleUpdateMilestone(currentMilestone.id, "SUBMITTED")}
                    disabled={!!loading}
                  >
                    {loading === currentMilestone.id ? "Submitting..." : "Submit Proof"}
                  </Button>
                )}
                
                {userRole === "CUSTOMER" && currentMilestone.status === "SUBMITTED" && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => handleUpdateMilestone(currentMilestone.id, "APPROVED")}
                    disabled={!!loading}
                  >
                    {loading === currentMilestone.id ? "Working..." : "Approve Work"}
                  </Button>
                )}

                {userRole === "CUSTOMER" && currentMilestone.status === "APPROVED" && (
                  <Button 
                    size="sm" 
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
                    onClick={() => handleUpdateMilestone(currentMilestone.id, "PAID")}
                    disabled={!!loading}
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    {loading === currentMilestone.id ? "Confirming..." : "Confirm Paid"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">All milestones completed. Waiting for final review.</span>
          </div>
        )}

        {/* Footer/Meta */}
        <div className="pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent text-[10px] flex items-center justify-center text-accent-foreground font-black">
              {userRole === "CUSTOMER" ? "W" : "C"}
            </div>
            <span>
              {userRole === "CUSTOMER" 
                ? `Worker: ${job.quotes?.[0]?.worker?.district || "Assigned"}` 
                : `Customer: ${job.customer?.user?.phoneNumber || "Private"}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Updated 2 days ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
