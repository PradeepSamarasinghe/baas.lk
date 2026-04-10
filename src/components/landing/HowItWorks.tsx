"use client";

import {
  ClipboardList,
  Search,
  ShieldCheck,
  Star,
  UserCheck,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const customerSteps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Post Your Job",
    desc: "Describe what you need — from plumbing to painting. Add photos, budget, and timeline. Takes less than 2 minutes.",
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.18)",
    tag: "Free & Instant",
    tagIcon: Zap,
  },
  {
    number: "02",
    icon: Search,
    title: "Find Verified Workers",
    desc: "Browse NIC-verified, rated workers in your area. Compare profiles, reviews, and quotes side-by-side.",
    accent: "from-blue-400 to-cyan-500",
    glow: "rgba(59,130,246,0.18)",
    tag: "Verified Profiles",
    tagIcon: ShieldCheck,
  },
  {
    number: "03",
    icon: Star,
    title: "Get Quality Work",
    desc: "Track milestones with photo proof at every stage. Release payment only when you're fully satisfied.",
    accent: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.18)",
    tag: "100% Secure",
    tagIcon: CheckCircle2,
  },
];

const workerSteps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Get Verified",
    desc: "Upload your NIC, take a live selfie, and submit your trade certifications. Build instant trust with customers.",
    accent: "from-violet-400 to-purple-500",
    glow: "rgba(167,139,250,0.18)",
    tag: "24hr Approval",
    tagIcon: Zap,
  },
  {
    number: "02",
    icon: Briefcase,
    title: "Receive Jobs",
    desc: "Get matched with jobs near you based on your trade and location. Send competitive quotes in seconds.",
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.18)",
    tag: "Smart Matching",
    tagIcon: Search,
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Build Reputation",
    desc: "Earn 5-star reviews, climb search rankings, and grow your client base. Your verified badge does the talking.",
    accent: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.18)",
    tag: "Grow Faster",
    tagIcon: TrendingUp,
  },
];

// ─── Step Card ─────────────────────────────────────────────────────────────────

const StepCard = ({
  step,
  index,
  visible,
  isLast,
}: {
  step: (typeof customerSteps)[0];
  index: number;
  visible: boolean;
  isLast: boolean;
}) => {
  const Icon = step.icon;
  const TagIcon = step.tagIcon;

  return (
    <div
      className={`relative flex flex-col transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      style={{ transitionDelay: `${index * 180}ms` }}
    >
      {/* ── Connector line (desktop) ── */}
      {!isLast && (
        <div className="hidden lg:block absolute top-[52px] left-[calc(50%+52px)] w-[calc(100%-104px)] z-0">
          <div className="h-px bg-gradient-to-r from-border via-border to-transparent" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-1.5 h-1.5 rounded-full bg-secondary/50"
          />
        </div>
      )}

      {/* ── Card body ── */}
      <div
        className="group relative bg-card border border-border rounded-2xl p-6 pt-5
          hover:border-secondary/30 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)]
          transition-all duration-400 cursor-default overflow-hidden"
      >
        {/* Background glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at top left, ${step.glow} 0%, transparent 60%)`,
          }}
        />

        {/* Large step number — decorative */}
        <div
          className="absolute top-3 right-4 font-black text-[56px] leading-none
            text-foreground/[0.04] group-hover:text-foreground/[0.07]
            transition-colors duration-300 select-none pointer-events-none"
        >
          {step.number}
        </div>

        {/* Step number pill */}
        <div
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-gradient-to-br ${step.accent} text-white text-xs font-black mb-5
            shadow-[0_4px_12px_-2px_${step.glow}]`}
        >
          {index + 1}
        </div>

        {/* Icon */}
        <div
          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${step.accent}
            flex items-center justify-center mb-5 z-10
            shadow-[0_0_24px_-4px_${step.glow}]
            group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>

        {/* Tag */}
        <div className="flex items-center gap-1.5 mb-3 z-10 relative">
          <TagIcon className="w-3 h-3 text-secondary" />
          <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">
            {step.tag}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-display font-bold text-[18px] text-foreground mb-2.5 z-10 relative">
          {step.title}
        </h3>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed z-10 relative">
          {step.desc}
        </p>

        {/* Bottom CTA hint */}
        <div
          className="flex items-center gap-1.5 mt-5 text-[12px] font-semibold text-secondary/70
            group-hover:text-secondary opacity-0 group-hover:opacity-100
            translate-y-1 group-hover:translate-y-0 transition-all duration-300"
        >
          Learn more <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const HowItWorks = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"customer" | "worker">("customer");
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const switchTab = (tab: "customer" | "worker") => {
    if (tab === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimating(false);
    }, 200);
  };

  const steps = activeTab === "customer" ? customerSteps : workerSteps;

  return (
    <section id="how-it-works" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary
            text-xs font-bold uppercase tracking-[0.12em] mb-5">
            How it Works
          </span>

          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold
            text-foreground mb-4 tracking-tight">
            Simple. Transparent.{" "}
            <span className="text-gradient-accent">Trusted.</span>
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed mb-10">
            Whether you&apos;re hiring or looking for work, we&apos;ve built every step
            to be effortless and secure.
          </p>

          {/* ── Tab switcher ── */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-muted border border-border">
            {(["customer", "worker"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`relative px-7 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-300 ${activeTab === tab
                    ? "bg-card text-foreground shadow-[var(--shadow-md)] border border-border"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {activeTab === tab && (
                  <span
                    className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
                    style={{
                      background:
                        tab === "customer"
                          ? "linear-gradient(135deg, rgba(245,158,11,0.15), transparent)"
                          : "linear-gradient(135deg, rgba(167,139,250,0.15), transparent)",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === "customer" ? (
                    <>
                      <ClipboardList className="w-4 h-4" />
                      I Need Workers
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      I&apos;m a Worker
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Steps grid ── */}
        <div
          className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto
            transition-all duration-200 ${animating ? "opacity-0 scale-[0.99]" : "opacity-100 scale-100"
            }`}
        >
          {steps.map((step, i) => (
            <StepCard
              key={`${activeTab}-${step.number}`}
              step={step}
              index={i}
              visible={visible}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* ── Bottom trust strip ── */}
        <div
          className={`mt-16 flex flex-wrap items-center justify-center gap-8
            transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          {[
            { label: "45,000+ Jobs Completed", icon: CheckCircle2, color: "text-emerald-500" },
            { label: "12,000+ Verified Workers", icon: ShieldCheck, color: "text-blue-500" },
            { label: "4.8 Average Rating", icon: Star, color: "text-amber-500" },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center`}>
                  <ItemIcon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;