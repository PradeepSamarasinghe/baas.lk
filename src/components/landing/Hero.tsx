"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Shield, Star } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero-workers.jpg";

const Hero = () => (
  <section className="relative min-h-[92vh] flex items-center bg-gradient-hero overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[140px]" />
    <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[120px]" />
    <div className="absolute top-1/2 left-0 w-40 h-40 rounded-full bg-primary-foreground/3 blur-[80px]" />

    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary-foreground/80 text-sm font-medium mb-8">
            <Shield className="w-4 h-4 text-secondary" />
            Sri Lanka's #1 Verified Labor Marketplace
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primary-foreground leading-[1.08] mb-6 tracking-tight">
            Hire Trusted Workers.{" "}
            <span className="text-gradient-accent">Build with Confidence.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/55 leading-relaxed mb-10 max-w-md">
            Connect with NIC-verified masons, electricians, plumbers, and more. Track every milestone. Pay with peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-gradient-accent text-accent-foreground font-bold text-base shadow-glow animate-pulse-glow hover:opacity-90 transition-all px-8 h-12">
              Find a Worker <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold text-base px-8 h-12">
              Join as a Worker
            </Button>
          </div>

          <div className="flex items-center gap-8 text-sm text-primary-foreground/45">
            {[
              { label: "NIC Verified" },
              { label: "Milestone Tracking" },
              { label: "Rated & Reviewed" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-secondary" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-xl)]">
            <Image
              src={heroImage}
              alt="Verified construction workers on Baas.lk platform"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent" />
          </div>

          {/* Floating card - workers */}
          <div className="absolute -bottom-5 -left-5 glass rounded-2xl p-5 animate-float shadow-[var(--shadow-xl)]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-success/20 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-primary-foreground text-sm font-bold">12,000+ Workers</div>
                <div className="text-primary-foreground/45 text-xs">Verified & Ready</div>
              </div>
            </div>
          </div>

          {/* Floating card - rating */}
          <div className="absolute -top-3 -right-3 glass rounded-xl p-3.5 animate-float shadow-[var(--shadow-lg)]" style={{ animationDelay: "1.5s" }}>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-primary-foreground text-xs font-bold">4.8</span>
            </div>
            <div className="text-primary-foreground/45 text-[10px] mt-1">45,000+ reviews</div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default Hero;
