"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { DollarSign, MessageSquare, Send } from "lucide-react";

interface QuoteFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export function QuoteForm({ jobId, onSuccess }: QuoteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          amount: formData.amount,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to submit quote");
      }

      toast.success("Quote submitted successfully!");
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-white dark:bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Send size={20} className="text-blue-600" />
          Submit a Quote
        </CardTitle>
        <CardDescription>
          Provide your best estimate for this project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold flex items-center gap-2">
              <DollarSign size={16} className="text-blue-500" />
              Your Quote (LKR)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g. 5000"
              className="h-11 rounded-xl"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-500" />
              Message to Customer
            </Label>
            <Textarea
              id="description"
              placeholder="Explain why you are the best fit for this job..."
              className="min-h-[100px] rounded-xl resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Quote"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
