import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ShieldCheck, MapPin, Star, Award, Hammer, Clock, ShieldAlert, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

async function getWorker(id: string) {
  const worker = await db.workerProfile.findUnique({
    where: { id },
    include: {
      user: true,
      _count: {
        select: { reviews: true }
      },
      reviews: {
        include: {
          customer: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });
  return worker;
}

export default async function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const worker = await getWorker(id);

  if (!worker) {
    notFound();
  }

  const avgRating = worker.reviews.length > 0
    ? worker.reviews.reduce((acc, r) => acc + r.rating, 0) / worker.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar/Initials Placeholder */}
          <div className="w-32 h-32 bg-blue-100 rounded-3xl flex items-center justify-center text-4xl font-black text-blue-600 shadow-inner">
            {worker.id.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50">
                  Worker {worker.id.slice(0, 6)}
                </h1>
                {worker.status === "VERIFIED" && (
                  <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-2 py-0.5 font-bold flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-zinc-500 font-medium">
                <MapPin size={16} />
                {worker.district}, Sri Lanka
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 dark:bg-zinc-800 dark:border-zinc-700">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="font-bold">{avgRating.toFixed(1)}</span>
                <span className="text-zinc-400 text-sm">({worker._count.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 dark:bg-zinc-800 dark:border-zinc-700 font-bold text-blue-600">
                LKR {worker.baseRate ? Number(worker.baseRate).toLocaleString() : "--"} / day
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Button size="lg" className="flex-1 md:w-40 rounded-2xl bg-zinc-900 text-white hover:bg-black font-bold h-12">
              Hire Now
            </Button>
            <Button size="lg" variant="outline" className="flex-1 md:w-32 rounded-2xl font-bold h-12">
              Message
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* About/Experience */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Hammer size={20} className="text-blue-600" />
              Professional Summary
            </h2>
            <div className="flex flex-wrap gap-2">
              {worker.trade.map((t) => (
                <Badge key={t} className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-none rounded-lg font-bold">
                  {t}
                </Badge>
              ))}
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {worker.experience || "No professional summary provided."}
            </p>
          </section>

          {/* Certificates (Placeholder/Mock) */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 space-y-4">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Award size={20} className="text-blue-600" />
              Verified Certificates
            </h2>
            {worker.certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {worker.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-slate-50 bg-slate-50/20 rounded-2xl">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileCheck size={20} />
                    </div>
                    <span className="text-sm font-bold truncate">Certificate {index + 1}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-zinc-500 font-medium">
                <ShieldAlert size={20} />
                No certificates uploaded yet.
              </div>
            )}
          </section>

          {/* Reviews Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-black px-4">Customer Reviews</h2>
            <div className="space-y-4">
              {worker.reviews.length > 0 ? (
                worker.reviews.map((review) => (
                  <Card key={review.id} className="rounded-3xl border-none shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                            C
                          </div>
                          <div>
                            <div className="font-bold text-sm">Customer {review.customerId.slice(-4)}</div>
                            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm italic font-medium">
                        "{review.comment}"
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                  <p className="text-zinc-400 font-bold">No reviews yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-none shadow-sm bg-zinc-900 text-white overflow-hidden p-8">
            <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-teal-400">
              <Clock size={20} />
              Quick Info
            </h3>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Availability</span>
                <Badge className="bg-teal-500/10 text-teal-400 border-none">Ready to Hire</Badge>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Response Time</span>
                <span className="text-zinc-50 font-bold">&lt; 1 hour</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Jobs Completed</span>
                <span className="text-zinc-50 font-bold">0</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400 pt-4 border-t border-zinc-800">
                <span>Member Since</span>
                <span className="text-zinc-50 font-bold">
                  {new Date(worker.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm border border-slate-100 bg-white p-8">
            <h3 className="font-black text-lg mb-4">Safety Tips</h3>
            <ul className="space-y-3 text-xs text-zinc-500 font-medium">
              <li className="flex gap-2">
                <ShieldCheck size={14} className="text-teal-600 shrink-0" />
                Review previous work photos and certifications.
              </li>
              <li className="flex gap-2">
                <ShieldCheck size={14} className="text-teal-600 shrink-0" />
                Agree on project milestones before starting.
              </li>
              <li className="flex gap-2">
                <ShieldCheck size={14} className="text-teal-600 shrink-0" />
                Always communicate through Baas.lk platform.
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
