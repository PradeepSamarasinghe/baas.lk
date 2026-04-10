"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Home, Building2 } from "lucide-react";

const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Moneragala", "Ratnapura", "Kegalle"
];

export function CustomerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "HOMEOWNER",
    district: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/customer-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      toast.success("Customer profile created successfully!");
      router.push("/dashboard"); // Redirect to customer dashboard
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-none shadow-xl bg-white/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
          Finish Setting Up
        </CardTitle>
        <CardDescription>
          Help us personlize your experience on Baas.lk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label>Account Type</Label>
            <RadioGroup
              defaultValue="HOMEOWNER"
              onValueChange={(v) => setFormData({ ...formData, type: v })}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="HOMEOWNER" id="homeowner" className="peer sr-only" />
                <Label
                  htmlFor="homeowner"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-600 [&:has([data-state=checked])]:border-orange-600"
                >
                  <Home className="mb-3 h-6 w-6" />
                  Homeowner
                </Label>
              </div>
              <div>
                <RadioGroupItem value="SME" id="sme" className="peer sr-only" />
                <Label
                  htmlFor="sme"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-600 [&:has([data-state=checked])]:border-orange-600"
                >
                  <Building2 className="mb-3 h-6 w-6" />
                  SME / Business
                </Label>
              </div>
            </RadioGroup>
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

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white shadow-lg shadow-orange-500/20"
            disabled={loading}
          >
            {loading ? "Saving..." : "Start Exploring"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
