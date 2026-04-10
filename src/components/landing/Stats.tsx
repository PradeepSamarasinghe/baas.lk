"use client";

import { useEffect, useRef, useState } from "react";
import { Users, CheckCircle, Star, MapPin } from "lucide-react";

const stats = [
  { value: "12,000+", label: "Verified Workers", icon: Users },
  { value: "45,000+", label: "Jobs Completed", icon: CheckCircle },
  { value: "4.8", label: "Average Rating", icon: Star },
  { value: "25", label: "Districts Covered", icon: MapPin },
];

const Stats = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-hero relative overflow-hidden" ref={ref}>
      {/* Subtle decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`text-center transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground mb-1 tracking-tight">
                  {s.value}
                </div>
                <div className="text-sm text-primary-foreground/50 font-medium">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
