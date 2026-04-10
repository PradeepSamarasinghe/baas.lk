"use client";

import { useEffect, useRef, useState } from "react";
import { Wrench, Zap, Droplets, PaintBucket, Hammer, Flame, ArrowRight } from "lucide-react";

const categories = [
  { icon: Hammer, name: "Masons", jobs: "2,400+", color: "from-amber-500 to-orange-600" },
  { icon: Zap, name: "Electricians", jobs: "1,800+", color: "from-blue-500 to-cyan-500" },
  { icon: Droplets, name: "Plumbers", jobs: "1,200+", color: "from-sky-500 to-blue-600" },
  { icon: Wrench, name: "Carpenters", jobs: "950+", color: "from-emerald-500 to-teal-600" },
  { icon: PaintBucket, name: "Painters", jobs: "1,100+", color: "from-violet-500 to-purple-600" },
  { icon: Flame, name: "Welders", jobs: "780+", color: "from-rose-500 to-red-600" },
];

const WorkerCategories = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Every Trade, One Platform
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Find verified professionals across all major construction and home improvement trades.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`group relative bg-card rounded-2xl p-6 border border-border shadow-card hover:border-secondary/40 transition-all duration-500 cursor-pointer hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{cat.jobs} jobs completed</p>
                <div className="flex items-center gap-1 text-xs font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Browse <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkerCategories;
