"use client";

import {
  Shield,
  Camera,
  FileCheck,
  BadgeCheck,
  MessageSquareWarning,
  Star,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: FileCheck,
    title: "NIC Verification",
    desc: "Every worker's National Identity Card is verified against government records before they can accept a single job.",
    step: "01",
    accent: "from-amber-400 to-orange-500",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-200/60",
    textAccent: "text-amber-600",
    glowColor: "rgba(245,158,11,0.12)",
    badge: "Step 1",
  },
  {
    icon: Camera,
    title: "Selfie Match",
    desc: "Real-time selfie verification ensures the person on-site matches their government ID photo — no impostors.",
    step: "02",
    accent: "from-blue-400 to-cyan-500",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200/60",
    textAccent: "text-blue-600",
    glowColor: "rgba(59,130,246,0.10)",
    badge: "Step 2",
  },
  {
    icon: BadgeCheck,
    title: "Trade Certifications",
    desc: "Workers upload professional certifications which our team individually validates — only genuine credentials earn the badge.",
    step: "03",
    accent: "from-emerald-400 to-teal-500",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200/60",
    textAccent: "text-emerald-600",
    glowColor: "rgba(52,211,153,0.10)",
    badge: "Step 3",
  },
  {
    icon: Shield,
    title: "Work Proof System",
    desc: "Photo and video evidence is required at every milestone — giving customers complete visibility into all work progress.",
    step: "04",
    accent: "from-violet-400 to-purple-500",
    lightBg: "bg-violet-50",
    borderColor: "border-violet-200/60",
    textAccent: "text-violet-600",
    glowColor: "rgba(167,139,250,0.10)",
    badge: "On-Site",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    desc: "Only customers who completed a paid job can leave a review. Zero incentivised or fake ratings — ever.",
    step: "05",
    accent: "from-rose-400 to-pink-500",
    lightBg: "bg-rose-50",
    borderColor: "border-rose-200/60",
    textAccent: "text-rose-600",
    glowColor: "rgba(244,63,94,0.10)",
    badge: "Post-Job",
  },
  {
    icon: MessageSquareWarning,
    title: "Dispute Resolution",
    desc: "Dedicated trust & safety team mediates all disputes fairly, with evidence review and resolution within 48 hours.",
    step: "06",
    accent: "from-sky-400 to-blue-500",
    lightBg: "bg-sky-50",
    borderColor: "border-sky-200/60",
    textAccent: "text-sky-600",
    glowColor: "rgba(14,165,233,0.10)",
    badge: "Support",
  },
];

// ─── Regular Trust Card ────────────────────────────────────────────────────────

const TrustCard = ({
  feature,
  index,
  visible,
}: {
  feature: (typeof features)[0];
  index: number;
  visible: boolean;
}) => {
  const Icon = feature.icon;
  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden cursor-default
        border border-gray-100/80
        hover:border-transparent hover:-translate-y-1.5
        hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.10)]
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 10% 10%, ${feature.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${feature.accent}
        scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`} />

      <div className="relative z-10 p-6">
        {/* Step number — decorative bg */}
        <div className="absolute top-4 right-5 text-[44px] font-black text-gray-900/[0.035]
          select-none leading-none group-hover:text-gray-900/[0.06] transition-colors duration-300">
          {feature.step}
        </div>

        {/* Icon */}
        <div className={`w-[52px] h-[52px] rounded-xl bg-gradient-to-br ${feature.accent}
          flex items-center justify-center mb-5
          group-hover:scale-110 transition-transform duration-300
          shadow-sm`}>
          <Icon className="w-[22px] h-[22px] text-white" strokeWidth={2} />
        </div>

        {/* Badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full
            ${feature.lightBg} ${feature.textAccent} border ${feature.borderColor}
            text-[10px] font-bold uppercase tracking-widest`}>
            <Lock className="w-2.5 h-2.5" />
            {feature.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[17px] text-gray-900 mb-2 tracking-tight">
          {feature.title}
        </h3>

        {/* Desc */}
        <p className="text-[12.5px] text-gray-500 leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const TrustFeatures = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="trust" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <div
          className={`text-center mb-14 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full
            bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-[0.12em] mb-5">
            Trust &amp; Safety
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold
            text-foreground mb-4 tracking-tight">
            Built on Verification,{" "}
            <br className="hidden md:block" />
            <span className="text-gradient-accent">Not Guesswork</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
            Every layer of Baas.lk is engineered to create genuine, verifiable trust
            between workers and customers — from the first click to final payment.
          </p>
        </div>

        {/* ── Mosaic grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <TrustCard key={f.title} feature={f} index={i} visible={visible} />
          ))}
        </div>

        {/* ── Bottom proof strip ── */}
        <div
          className={`mt-12 transition-all duration-700 delay-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="bg-[#0a1628] rounded-2xl px-8 py-6
            flex flex-col md:flex-row items-center justify-between gap-6
            max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">
                  Every worker passes a 3-step verification before joining
                </div>
                <div className="text-[12px] text-white/45 mt-0.5">
                  NIC check · Live selfie · Trade certification review
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              {[
                { val: "12K+", label: "Verified Workers" },
                { val: "100%", label: "ID Checked" },
                { val: "48hr", label: "Dispute Resolution" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[20px] font-black text-amber-400 tracking-tight">{s.val}</div>
                  <div className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustFeatures;