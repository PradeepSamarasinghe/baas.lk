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
import { Briefcase, MapPin, DollarSign, FileText } from "lucide-react";

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

export function JobPostForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    trade: "",
    district: "",
    description: "",
    budget: "",
    location: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to post job");
      }

      toast.success("Job posted successfully!");
      router.push("/dashboard/customer/jobs"); // Redirect to customer jobs dashboard
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-2xl bg-white/90 backdrop-blur-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
          <Briefcase size={24} />
        </div>
        <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Post a New Job
        </CardTitle>
        <CardDescription className="text-lg">
          Describe what you need and get quotes from verified workers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="trade" className="text-sm font-semibold flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" />
                Service Needed
              </Label>
              <Select onValueChange={(v) => setFormData({ ...formData, trade: v })} required>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="What trade do you need?" />
                </SelectTrigger>
                <SelectContent>
                  {TRADES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-semibold flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                District
              </Label>
              <Select onValueChange={(v) => setFormData({ ...formData, district: v })} required>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              Specific Address (Optional)
            </Label>
            <Input
              id="location"
              placeholder="House #, Street, City"
              className="h-11 rounded-xl"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-semibold flex items-center gap-2">
              <DollarSign size={16} className="text-blue-500" />
              Estimated Budget (LKR - Optional)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="How much are you looking to spend?"
              className="h-11 rounded-xl"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
              <FileText size={16} className="text-blue-500" />
              Job Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the work in detail (e.g. Broken pipe in kitchen, needs immediate fix)"
              className="min-h-[120px] rounded-xl resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold shadow-xl shadow-blue-500/25 rounded-xl transition-all hover:scale-[1.01]"
            disabled={loading}
          >
            {loading ? "Posting Job..." : "Post Job Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
