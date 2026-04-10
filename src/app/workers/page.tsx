import { WorkerSearch } from "@/components/marketplace/WorkerSearch";
import { ShieldCheck, Users, MapPin } from "lucide-react";

export default function WorkersPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
      {/* Dynamic Header */}
      <section className="bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Find the perfect <span className="text-blue-600">Baas</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl font-medium">
              Browse through our community of verified professionals and get your project started today.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-600">
              <ShieldCheck size={18} className="text-blue-600" />
              100% Vetted Workers
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-600">
              <Users size={18} className="text-blue-600" />
              Trusted by 1000+ Customers
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-600">
              <MapPin size={18} className="text-blue-600" />
              Island-wide Coverage
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 -mt-8">
        <WorkerSearch />
      </main>
    </div>
  );
}
