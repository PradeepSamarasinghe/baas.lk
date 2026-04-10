"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Moneragala", "Ratnapura", "Kegalle"
];

const TRADES = [
  "Plumber", "Electrician", "Carpenter", "Mason", "Painter", "Plasterer",
  "Welder", "Tiler", "AC Technician", "Roofer", "Gardener", "Cleaner"
];

export function WorkerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    trade: "",
    district: "",
    baseRate: "",
    experience: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/worker-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          trade: [formData.trade], // In this simplified version, we treat it as an array to match the schema
        }),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      toast.success("Worker profile created successfully!");
      router.push("/onboarding/worker/documents"); // Next step: Document Upload
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-none shadow-xl bg-white/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
          Complete Your Worker Profile
        </CardTitle>
        <CardDescription>
          Tell us about your skills and where you operate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="trade">Primary Trade</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, trade: v })} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your trade" />
              </SelectTrigger>
              <SelectContent>
                {TRADES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, district: v })} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your district" />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseRate">Daily Rate (Optional)</Label>
            <Input
              id="baseRate"
              type="number"
              placeholder="e.g. 2500"
              value={formData.baseRate}
              onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Your Experience</Label>
            <Textarea
              id="experience"
              placeholder="Tell us about your work history..."
              className="resize-none h-32"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/20"
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue to Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
