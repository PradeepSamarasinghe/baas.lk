"use client";

import { ArrowRight, BadgeCheck, Shield, Star } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero-workers.jpg";

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(150deg, #071525 0%, #0D1E35 40%, #112444 100%)" }}>
    {/* Background glow effects */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #1a3a5c 0%, transparent 70%)" }} />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }} />

    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/75 text-sm font-medium mb-8">
            <Shield className="w-4 h-4 text-[#F59E0B]" />
            Sri Lanka's #1 Verified Labor Marketplace
          </div>

          {/* Headline */}
          <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[3.8rem] font-black text-white leading-[1.05] mb-6 tracking-tight">
            Hire Trusted Workers.{" "}
            <span className="text-[#F59E0B]">Build with Confidence.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-md">
            Connect with NIC-verified masons, electricians, plumbers, and more. Track every milestone. Pay with peace of mind.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="inline-flex items-center justify-center gap-2 px-8 h-12 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1628] font-bold text-base rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02]">
              Find a Worker <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 h-12 border border-white/20 text-white font-bold text-base rounded-xl hover:bg-white/8 transition-all duration-200">
              Join as a Worker
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
            {["NIC Verified", "Milestone Tracking", "Rated & Reviewed"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow: "0 30px 80px -10px rgba(0,0,0,0.5)" }}>
            <Image
              src={heroImage}
              alt="Verified construction workers"
              width={700}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/30 via-transparent to-transparent" />
          </div>

          {/* Floating Star Rating Card */}
          <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3.5 shadow-xl">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
              <span className="text-white text-xs font-bold ml-1">4.8</span>
            </div>
            <div className="text-white/45 text-[10px] mt-0.5">45,000+ reviews</div>
          </div>

          {/* Floating Workers Count Card */}
          <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-white text-sm font-bold">12,000+ Workers</div>
                <div className="text-white/45 text-xs">Verified & Ready</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Bottom fade to white */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f5f6f8] to-transparent" />
  </section>
);

export default Hero;