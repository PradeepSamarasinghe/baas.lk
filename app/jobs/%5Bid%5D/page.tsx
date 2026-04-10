import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, DollarSign, Calendar, MessageSquare, ShieldCheck, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuoteForm } from "@/components/quotes/QuoteForm";
import { Button } from "@/components/ui/button";

async function getJob(id: string) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      customer: {
        include: { user: true }
      },
      quotes: {
        include: {
          worker: {
            include: { user: true }
          }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });
  return job;
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  const isOwner = session?.user?.id === job.customer.userId;

  // Check if current user is a worker who has already quoted
  let hasQuoted = false;
  let userWorkerProfile = null;
  
  if (session?.user?.id) {
    userWorkerProfile = await prisma.workerProfile.findUnique({
      where: { userId: session.user.id }
    });
    if (userWorkerProfile) {
      hasQuoted = job.quotes.some(q => q.workerId === userWorkerProfile?.id);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pb-20">
      {/* Header Section */}
      <div className="bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-lg px-3 py-1 font-bold">
              {job.trade}
            </Badge>
            <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none rounded-lg px-3 py-1 font-bold">
              {job.status}
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 leading-tight">
              {job.trade} Requirement in {job.district}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-zinc-500 font-medium pt-2">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                {job.district}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-blue-600" />
                Est. Budget: LKR {job.budget ? Number(job.budget).toLocaleString() : "Not Specified"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <Briefcase size={24} className="text-blue-600" />
              Job Description
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-lg">
              {job.description}
            </p>
            {job.location && (
              <div className="pt-4 border-t border-slate-50 flex items-start gap-3">
                <MapPin size={20} className="text-zinc-400 mt-1" />
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Exact Location</div>
                  <div className="text-zinc-700 font-bold">{job.location}</div>
                </div>
              </div>
            )}
          </section>

          {/* Quotes Section */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-2xl font-black">Received Quotes</h2>
              <Badge variant="outline" className="rounded-full px-3 py-1 font-bold">
                {job.quotes.length} total
              </Badge>
            </div>

            <div className="space-y-4">
              {job.quotes.length > 0 ? (
                job.quotes.map((quote) => (
                  <Card key={quote.id} className="rounded-3xl border-none shadow-sm bg-white dark:bg-zinc-900 overflow-hidden group hover:shadow-md transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black">
                              {quote.worker.id.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-black text-lg">Worker {quote.worker.id.slice(0, 8)}</div>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-blue-600" />
                                Verified Pro
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-zinc-600 dark:text-zinc-400 font-medium italic">
                            "{quote.description || "No message provided."}"
                          </p>
                        </div>

                        <div className="md:text-right flex flex-col justify-between items-end gap-4 min-w-[200px]">
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Quote Amount</div>
                            <div className="text-3xl font-black text-blue-600">
                              LKR {Number(quote.amount).toLocaleString()}
                            </div>
                          </div>

                          {isOwner && quote.status === "PENDING" && (
                            <div className="flex gap-2 w-full md:w-auto">
                              <Button className="flex-1 md:w-28 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold">
                                Accept
                              </Button>
                              <Button variant="outline" className="flex-1 md:w-28 rounded-xl font-bold">
                                Reject
                              </Button>
                            </div>
                          )}

                          {quote.status !== "PENDING" && (
                            <Badge className={quote.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}>
                              {quote.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="mx-auto w-16 h-16 bg-slate-50 flex items-center justify-center rounded-full text-zinc-300 mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900">No quotes yet</h3>
                  <p className="text-zinc-500">Quotes from verified workers will appear here.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Action Card for Workers */}
          {!isOwner && userWorkerProfile && (
            <div className="sticky top-24">
              {hasQuoted ? (
                <Card className="rounded-3xl border-none shadow-sm bg-emerald-50 p-8">
                  <div className="space-y-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-xl text-emerald-900">Quote Submitted</h3>
                      <p className="text-emerald-700 text-sm font-medium leading-relaxed">
                        You have already submitted a quote for this job. You'll be notified if the customer accepts it.
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                <QuoteForm jobId={job.id} />
              )}
            </div>
          )}

          {/* Customer Info Card */}
          <Card className="rounded-3xl border-none shadow-sm bg-white dark:bg-zinc-900 p-8 space-y-6">
            <h3 className="font-black text-lg">About the Customer</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                <User size={24} />
              </div>
              <div>
                <div className="font-bold">Customer {job.customer.id.slice(-4)}</div>
                <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                  Member since {new Date(job.customer.createdAt).getFullYear()}
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Postings</span>
                <span className="font-bold">{job.customer._count.jobs || 0} Jobs</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 font-medium">Hired</span>
                <span className="font-bold">0% Hire Rate</span>
              </div>
            </div>
          </Card>

          {/* Guidelines */}
          <div className="px-4 space-y-4">
            <h3 className="font-black text-lg">Marketplace Rules</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                <p className="text-sm text-zinc-500 font-medium">Communicate clearly about project scope.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                <p className="text-sm text-zinc-500 font-medium">Do not share contact details before a quote is accepted.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                <p className="text-sm text-zinc-500 font-medium">Agree on milestones for payment safety.</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
