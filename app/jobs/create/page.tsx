import { JobPostForm } from "@/components/jobs/JobPostForm";

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Premium Header/Banner */}
      <div className="bg-blue-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Post Your Project</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto font-medium">
          Whether it's a quick fix or a major renovation, find the right professional for the job.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="-mt-12 pb-24 px-4 sm:px-6">
        <JobPostForm />
      </div>

      {/* Trust Indicators */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800">
          <div>
            <div className="text-blue-600 font-bold text-xl mb-1">100% Verified</div>
            <p className="text-sm text-zinc-500">Every worker is vetted before joining</p>
          </div>
          <div className="border-y md:border-y-0 md:border-x border-slate-100 dark:border-zinc-800 py-6 md:py-0">
            <div className="text-blue-600 font-bold text-xl mb-1">Fast Quotes</div>
            <p className="text-sm text-zinc-500">Get bids within minutes</p>
          </div>
          <div>
            <div className="text-blue-600 font-bold text-xl mb-1">Secure</div>
            <p className="text-sm text-zinc-500">Safe and reliable job management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
