import { WorkerForm } from "@/components/onboarding/WorkerForm";

export default function WorkerOnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <h2 className="text-sm font-semibold tracking-widest text-teal-600 uppercase">
            Onboarding Step 1 of 2
          </h2>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Let's build your profile
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Professional profiles help you get more jobs and build trust with customers.
          </p>
        </div>

        <WorkerForm />
      </div>
    </div>
  );
}
