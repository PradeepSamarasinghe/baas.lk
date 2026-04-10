"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, ShieldCheck, Filter } from "lucide-react";

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

export function WorkerSearch() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    trade: "",
    district: "",
    verified: false,
  });

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.trade) params.append("trade", filters.trade);
      if (filters.district) params.append("district", filters.district);
      if (filters.verified) params.append("verified", "true");

      const response = await fetch(`/api/workers?${params.toString()}`);
      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.error("Failed to fetch workers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [filters]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Filters */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2 w-full">
          <Label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Search Trade</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <Select onValueChange={(v) => setFilters(f => ({ ...f, trade: v === "all" ? "" : v }))}>
              <SelectTrigger className="pl-10 h-12 rounded-2xl">
                <SelectValue placeholder="All Trades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trades</SelectItem>
                {TRADES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 space-y-2 w-full">
          <Label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <Select onValueChange={(v) => setFilters(f => ({ ...f, district: v === "all" ? "" : v }))}>
              <SelectTrigger className="pl-10 h-12 rounded-2xl">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {DISTRICTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          variant={filters.verified ? "default" : "outline"}
          onClick={() => setFilters(f => ({ ...f, verified: !f.verified }))}
          className="h-12 px-6 rounded-2xl gap-2 flex shrink-0"
        >
          <ShieldCheck size={18} className={filters.verified ? "text-white" : "text-blue-600"} />
          Verified Only
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
          ))
        ) : workers.length > 0 ? (
          workers.map((worker: any) => (
            <Card key={worker.id} className="group overflow-hidden rounded-3xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm border-slate-50">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-zinc-900">Worker ID: {worker.id.slice(0, 8)}</h3>
                    <div className="flex flex-wrap gap-1">
                      {worker.trade.map((t: string) => (
                        <Badge key={t} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-lg text-[10px] uppercase font-bold">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {worker.status === "VERIFIED" && (
                    <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                      <ShieldCheck size={20} fill="currentColor" className="text-blue-100 fill-blue-600" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <MapPin size={16} className="text-zinc-400" />
                  {worker.district}
                </div>

                <div className="flex items-center gap-4 py-2 border-y border-slate-50">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={16} fill="currentColor" />
                    {worker.averageRating || "N/A"}
                  </div>
                  <div className="text-sm text-zinc-400 font-medium">
                    {worker.reviewCount || 0} reviews
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Base Rate</span>
                    <div className="font-black text-lg text-blue-600">
                      LKR {worker.baseRate ? Number(worker.baseRate).toLocaleString() : "Contact"}
                    </div>
                  </div>
                  <Button className="rounded-2xl bg-zinc-900 text-white hover:bg-black font-bold h-11 px-6">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-slate-100 flex items-center justify-center rounded-full text-slate-400">
              <Filter size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">No workers found</h3>
              <p className="text-zinc-500">Try adjusting your filters to find more results.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
