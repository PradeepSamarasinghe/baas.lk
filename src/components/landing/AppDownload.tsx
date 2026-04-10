"use client";

import { useEffect, useRef, useState } from "react";
import { Apple, Play } from "lucide-react";
import Image from "next/image";
import appMockup from "@/assets/app-mockup.png";

const AppDownload = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          className={`relative rounded-3xl bg-gradient-hero p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[140px] pointer-events-none" />

          {/* Text */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold uppercase tracking-wider mb-5">
              Get the App
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary-foreground mb-5 tracking-tight">
              Baas.lk in Your Pocket
            </h2>
            <p className="text-primary-foreground/60 max-w-md mb-8 leading-relaxed text-base">
              Post jobs, discover verified workers, track milestones, and manage payments — all from your phone. Available on iOS and Android.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 hover:bg-primary-foreground/15 transition-all duration-200 hover:border-primary-foreground/25"
              >
                <Apple className="w-6 h-6 text-primary-foreground" />
                <div className="text-left">
                  <div className="text-[10px] text-primary-foreground/50 leading-none">Download on the</div>
                  <div className="text-sm font-semibold text-primary-foreground leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 hover:bg-primary-foreground/15 transition-all duration-200 hover:border-primary-foreground/25"
              >
                <Play className="w-6 h-6 text-primary-foreground" />
                <div className="text-left">
                  <div className="text-[10px] text-primary-foreground/50 leading-none">Get it on</div>
                  <div className="text-sm font-semibold text-primary-foreground leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative z-10 flex-shrink-0">
            <div className="relative w-56 md:w-64">
              <Image
                src={appMockup}
                alt="Baas.lk mobile app preview"
                className="w-full h-auto drop-shadow-2xl animate-float"
                priority
              />
              <div className="absolute inset-0 -z-10 scale-90 blur-3xl bg-secondary/15 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
