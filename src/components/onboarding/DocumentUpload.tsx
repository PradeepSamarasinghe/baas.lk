"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Camera, FileCheck, CheckCircle2 } from "lucide-react";

interface UploadState {
  nic: boolean;
  selfie: boolean;
  certificates: boolean;
}

export function DocumentUpload() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState<UploadState>({
    nic: false,
    selfie: false,
    certificates: false,
  });

  const handleSimulatedUpload = async (type: "NIC" | "SELFIE" | "CERTIFICATE") => {
    setLoading(true);
    try {
      // Mocking an upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUrl = `https://example.com/uploads/${type.toLowerCase()}-${Date.now()}.jpg`;

      const response = await fetch("/api/user/worker-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, url: mockUrl }),
      });

      if (!response.ok) throw new Error("Failed to save document");

      setUploads(prev => ({ ...prev, [type.toLowerCase()]: true }));
      toast.success(`${type} uploaded successfully!`);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isComplete = uploads.nic && uploads.selfie;

  return (
    <Card className="w-full max-w-lg mx-auto border-none shadow-xl bg-white/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Identity Verification
        </CardTitle>
        <CardDescription>
          We need to verify your identity to ensure a safe marketplace for everyone.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* NIC Upload */}
          <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Upload size={20} />
              </div>
              <div>
                <Label className="font-semibold">NIC Photo</Label>
                <p className="text-xs text-zinc-500">Government issued ID</p>
              </div>
            </div>
            <Button 
              variant={uploads.nic ? "ghost" : "outline"}
              size="sm"
              onClick={() => handleSimulatedUpload("NIC")}
              disabled={loading || uploads.nic}
              className={uploads.nic ? "text-green-600" : ""}
            >
              {uploads.nic ? <CheckCircle2 size={18} /> : "Upload"}
            </Button>
          </div>

          {/* Selfie Upload */}
          <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Camera size={20} />
              </div>
              <div>
                <Label className="font-semibold">Selfie with ID</Label>
                <p className="text-xs text-zinc-500">Holding your NIC</p>
              </div>
            </div>
            <Button 
              variant={uploads.selfie ? "ghost" : "outline"}
              size="sm"
              onClick={() => handleSimulatedUpload("SELFIE")}
              disabled={loading || uploads.selfie}
              className={uploads.selfie ? "text-green-600" : ""}
            >
              {uploads.selfie ? <CheckCircle2 size={18} /> : "Upload"}
            </Button>
          </div>

          {/* Certificates (Optional) */}
          <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <FileCheck size={20} />
              </div>
              <div>
                <Label className="font-semibold">Certificates</Label>
                <p className="text-xs text-zinc-500">Professional certifications (Optional)</p>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => handleSimulatedUpload("CERTIFICATE")}
              disabled={loading}
            >
              Upload
            </Button>
          </div>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20"
          disabled={!isComplete || loading}
          onClick={() => router.push("/onboarding/complete")}
        >
          Complete Onboarding
        </Button>
      </CardContent>
    </Card>
  );
}
