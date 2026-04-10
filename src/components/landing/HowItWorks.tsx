"use client";

import { Search, FileCheck, Star, ClipboardList, UserCheck, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const customerSteps = [
  { icon: ClipboardList, title: "Post Your Job", desc: "Describe what you need — from plumbing to painting. Add photos, budget, and timeline." },
  { icon: Search, title: "Find Verified Workers", desc: "Browse NIC-verified, rated workers in your area. Compare profiles and quotes." },
  { icon: Star, title: "Get Quality Work", desc: "Track milestones, approve work proof, and pay with confidence." },
];

const workerSteps = [
  { icon: UserCheck, title: "Get Verified", desc: "Upload your NIC, selfie, and trade certifications. Build trust instantly." },
  { icon: Briefcase, title: "Receive Jobs", desc: "Get matched with jobs in your area. Send competitive quotes." },
  { icon: Star, title: "Build Reputation", desc: "Complete work, earn 5-star reviews, and grow your business." },
];

const StepCard = ({ step, index, visible }: { step: typeof customerSteps[0]; index: number; visible: boolean }) => {
  const Icon = step.icon;
  return (
    <div
      className={`relative flex flex-col items-center text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Step number */}
      <div className="w-8 h-8 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center text-secondary font-bold text-sm mb-5">
        {index + 1}
      </div>

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mb-5 shadow-glow">
        <Icon className="w-7 h-7 text-accent-foreground" />
      </div>

      <h3 className="font-display font-bold text-lg text-foreground mb-2">{step.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>

      {/* Connector line */}
      {index < 2 && (
        <div className="hidden md:block absolute top-4 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-border" />
      )}
    </div>
  );
};

const HowItWorks = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "worker">("customer");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const steps = activeTab === "customer" ? customerSteps : workerSteps;

  return (
    <section id="how-it-works" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            How it Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Simple, Transparent, Trusted
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Whether you're hiring or looking for work, we've made it effortless.
          </p>
        </div>

        <div className="flex justify-center mb-14">
          <div className="inline-flex rounded-full bg-muted p-1 gap-1">
            {(["customer", "worker"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab
                  ? "bg-card text-foreground shadow-[var(--shadow-md)]"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab === "customer" ? "I Need Workers" : "I'm a Worker"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={`${activeTab}-${step.title}`} step={step} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;