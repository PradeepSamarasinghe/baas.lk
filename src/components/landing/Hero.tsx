"use client";

import { ArrowRight, BadgeCheck, Shield, Star, MapPin, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Floating Card: Verified Worker Profile ───────────────────────────────────
const WorkerProfileCard = () => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[272px]
      rounded-2xl p-5
      bg-[#0a1628]/95 border border-[#f59e0b]/20
      shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(245,158,11,0.08)]
      animate-float"
    style={{ animationDelay: "0s" }}
  >
    {/* Header */}
    <div className="flex items-center gap-3 mb-3">
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-black text-sm text-[#1a0800]">
          RS
        </div>
        {/* Verified ring */}
        <div className="absolute inset-[-3px] rounded-full border-2 border-amber-400/50 pointer-events-none" />
        {/* Online dot */}
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0a1628] flex items-center justify-center">
          <span className="text-white text-[6px] font-black">✓</span>
        </div>
      </div>
      <div>
        <div className="text-[14px] font-bold text-white leading-tight">Ruwan Silva</div>
        <div className="text-[11px] text-white/45 mt-0.5">Master Mason · Colombo</div>
      </div>
    </div>

    {/* Verified badge */}
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/25 mb-3">
      <CheckCircle className="w-3 h-3 text-emerald-400" />
      <span className="text-[10px] font-bold text-emerald-400 tracking-wide">NIC Verified &amp; Background Checked</span>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-3 gap-2 mb-3">
      {[
        { val: "4.9", lbl: "Rating" },
        { val: "340", lbl: "Jobs" },
        { val: "8yr", lbl: "Exp" },
      ].map((s) => (
        <div key={s.lbl} className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2 text-center">
          <div className="text-[15px] font-black text-white">{s.val}</div>
          <div className="text-[9.5px] text-white/35 mt-0.5">{s.lbl}</div>
        </div>
      ))}
    </div>

    {/* Skills */}
    <div className="flex flex-wrap gap-1.5 mb-3">
      {["Brickwork", "Plastering", "Tiling"].map((sk) => (
        <span
          key={sk}
          className="px-2.5 py-0.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-[10px] font-semibold text-amber-400/80"
        >
          {sk}
        </span>
      ))}
    </div>

    {/* CTA */}
    <button className="w-full py-2.5 rounded-lg bg-amber-500 text-[#1a0800] text-[13px] font-bold shadow-[0_0_20px_-4px_rgba(245,158,11,0.4)] hover:opacity-90 transition-opacity">
      Hire Ruwan →
    </button>
  </div>
);

// ─── Floating Card: Milestone Progress ────────────────────────────────────────
const MilestoneCard = () => (
  <div
    className="absolute top-[-24px] left-[-52px] z-[8] w-[196px]
      rounded-xl p-4
      bg-[#0a1421]/92 border border-white/[0.09]
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      animate-float"
    style={{
      animationDelay: "0.5s",
      transform: "rotate(-4deg)",
      animationName: "floatB",
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-[11.5px] font-bold text-white">Job Milestones</span>
      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-400">
        Active
      </span>
    </div>

    {[
      { label: "Foundation", pct: 100, color: "bg-emerald-500" },
      { label: "Brickwork", pct: 68, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
      { label: "Plastering", pct: 0, color: "bg-white/10" },
    ].map((m) => (
      <div key={m.label} className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10.5px] text-white/50">{m.label}</span>
          <span className="text-[10.5px] font-bold text-white">{m.pct}%</span>
        </div>
        <div className="h-[3.5px] bg-white/[0.07] rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
        </div>
      </div>
    ))}

    <div className="flex justify-between items-center pt-2 mt-1 border-t border-white/[0.06]">
      <span className="text-[10px] text-white/35">Total Value</span>
      <span className="text-[11px] font-bold text-amber-400">LKR 85,000</span>
    </div>
  </div>
);

// ─── Floating Card: Payment Released ──────────────────────────────────────────
const PaymentCard = () => (
  <div
    className="absolute bottom-[-28px] right-[-44px] z-[9] w-[184px]
      rounded-xl p-4
      bg-[#08121e]/95 border border-emerald-500/15
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      animate-float"
    style={{
      animationDelay: "1s",
      transform: "rotate(3.5deg)",
      animationName: "floatC",
    }}
  >
    <div className="w-8 h-8 rounded-lg bg-emerald-500/12 flex items-center justify-center mb-2.5 text-base">
      💳
    </div>
    <div className="text-[10.5px] text-white/40 mb-1">Milestone payment released</div>
    <div className="text-[22px] font-black text-white tracking-tight mb-2">LKR 28,500</div>
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-[10px] font-bold text-emerald-400">Paid Securely</span>
    </div>
    <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-white/[0.06]">
      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[8px] font-black text-[#1a0800]">
        RS
      </div>
      <span className="text-[10px] text-white/45 truncate">Ruwan Silva · Foundation ✓</span>
    </div>
  </div>
);

// ─── Floating Card: Rating Notification ───────────────────────────────────────
const RatingCard = () => (
  <div
    className="absolute top-[10px] right-[-56px] z-[11] w-[164px]
      rounded-xl p-3.5
      bg-[#0c1629]/96 border border-white/[0.09]
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      animate-float"
    style={{ animationDelay: "0.8s" }}
  >
    <div className="flex items-center gap-2 mb-1.5">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
        KB
      </div>
      <span className="text-[11px] font-semibold text-white">Kumara B.</span>
      <span className="text-[9px] text-white/30 ml-auto">2m ago</span>
    </div>
    <div className="flex gap-0.5 mb-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-[10.5px] text-white/45 leading-relaxed">
      "Excellent work, very professional and punctual."
    </p>
  </div>
);

// ─── Floating Card: Live Jobs ──────────────────────────────────────────────────
const LiveJobsCard = () => (
  <div
    className="absolute bottom-[10px] left-[-60px] z-[11] w-[154px]
      rounded-xl p-3.5
      bg-[#0c1629]/96 border border-white/[0.08]
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      animate-float"
    style={{ animationDelay: "1.5s" }}
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
      <span className="text-[11px] font-bold text-white">Live in Colombo</span>
    </div>
    <div className="text-[22px] font-black text-amber-400 tracking-tight">47</div>
    <div className="text-[10px] text-white/40 mb-2">open jobs right now</div>
    <div className="flex flex-wrap gap-1">
      {["Mason", "Electric", "Plumber"].map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-[9.5px] font-semibold text-white/45"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

// ─── Main Hero Component ───────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen flex items-center bg-[#0a1628] overflow-hidden isolate">

    {/* ── Ambient glow layers ── */}
    <div className="absolute top-[-120px] right-[-60px] w-[640px] h-[640px] rounded-full
      bg-[radial-gradient(circle,rgba(245,158,11,0.10)_0%,transparent_65%)]
      pointer-events-none" />
    <div className="absolute bottom-[-200px] left-[-80px] w-[500px] h-[500px] rounded-full
      bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_65%)]
      pointer-events-none" />
    <div className="absolute top-[40%] left-[38%] w-[320px] h-[320px] rounded-full
      bg-[radial-gradient(circle,rgba(99,153,255,0.05)_0%,transparent_65%)]
      pointer-events-none" />

    {/* ── Subtle grid overlay ── */}
    <div
      className="absolute inset-0 pointer-events-none opacity-100"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />

    {/* ── Content ── */}
    <div className="container mx-auto px-4 md:px-6 pt-24 pb-20 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

        {/* ════════════════ LEFT ════════════════ */}
        <div className="max-w-xl">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-amber-500/10 border border-amber-500/20 mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            <span className="text-[12.5px] font-semibold text-amber-400/90 tracking-wide">
              Sri Lanka&apos;s #1 Verified Labor Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-[2.6rem] md:text-5xl lg:text-[3.4rem] font-extrabold
            text-white leading-[1.07] tracking-tight mb-5">
            Hire Trusted<br />Workers.{" "}
            <span className="text-gradient-accent">Build with<br />Confidence.</span>
          </h1>

          {/* Sub */}
          <p className="text-[17px] text-white/50 leading-relaxed mb-9 max-w-md">
            Connect with NIC-verified masons, electricians, plumbers, and more.
            Track every milestone. Pay with peace of mind.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button
              size="lg"
              className="bg-gradient-accent text-accent-foreground font-bold text-[15px]
                px-7 h-12 rounded-xl
                shadow-[0_0_32px_-4px_rgba(245,158,11,0.4)]
                hover:opacity-90 hover:-translate-y-0.5
                transition-all duration-200"
            >
              Find a Worker <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/15 bg-white/5 text-white/85 font-bold text-[15px]
                px-7 h-12 rounded-xl
                hover:bg-white/10 hover:border-white/25
                transition-all duration-200"
            >
              Join as a Worker
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {[
              { label: "NIC Verified" },
              { label: "Milestone Tracking" },
              { label: "Rated & Reviewed" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-2">
                {i > 0 && (
                  <div className="hidden sm:block w-px h-4 bg-white/10 mr-1" />
                )}
                <div className="w-[18px] h-[18px] rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-[12.5px] text-white/45 font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Social proof strip */}
          <div className="inline-flex items-center gap-3 mt-8 px-4 py-3
            bg-white/[0.04] border border-white/[0.08] rounded-xl">
            {/* Avatar stack */}
            <div className="flex">
              {[
                { initials: "RS", from: "#f97316", to: "#ea580c" },
                { initials: "KP", from: "#3b82f6", to: "#1d4ed8" },
                { initials: "NJ", from: "#10b981", to: "#059669" },
                { initials: "PK", from: "#8b5cf6", to: "#6d28d9" },
              ].map((av, i) => (
                <div
                  key={av.initials}
                  className="w-7 h-7 rounded-full flex items-center justify-center
                    text-[9px] font-bold text-white border-2 border-[#0a1628]"
                  style={{
                    background: `linear-gradient(135deg, ${av.from}, ${av.to})`,
                    marginLeft: i > 0 ? "-8px" : "0",
                  }}
                >
                  {av.initials}
                </div>
              ))}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center
                  text-[9px] font-bold text-white/40 border-2 border-[#0a1628]
                  bg-white/10"
                style={{ marginLeft: "-8px" }}
              >
                +
              </div>
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[12.5px] text-white/50">
                <span className="text-white font-semibold">12,000+</span> verified workers ·{" "}
                <span className="text-white font-semibold">4.8</span> avg rating
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ RIGHT — Card Stack ════════════════ */}
        <div className="hidden lg:flex items-center justify-center">
          {/*
            The platform container defines the coordinate space.
            All cards use absolute positioning within it.
            overflow-visible lets rotated / offset cards spill out naturally.
          */}
          <div className="relative w-[380px] h-[480px]">
            <WorkerProfileCard />
            <MilestoneCard />
            <PaymentCard />
            <RatingCard />
            <LiveJobsCard />
          </div>
        </div>

      </div>
    </div>

    {/* ── Hard bottom edge — NO white bleed ── */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

    {/* ── Keyframe overrides for the rotated cards ── */}
    <style>{`
      @keyframes floatB {
        0%, 100% { transform: rotate(-4deg) translateY(0px); }
        50%       { transform: rotate(-4deg) translateY(-7px); }
      }
      @keyframes floatC {
        0%, 100% { transform: rotate(3.5deg) translateY(0px); }
        50%       { transform: rotate(3.5deg) translateY(-6px); }
      }
    `}</style>
  </section>
);

export default Hero;