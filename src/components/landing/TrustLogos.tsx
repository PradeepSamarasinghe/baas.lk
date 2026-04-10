"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

const partners = [
  { name: "CIDA", full: "Construction Industry Development Authority" },
  { name: "ICTAD", full: "Institute for Construction Training & Development" },
  { name: "IESL", full: "Institution of Engineers Sri Lanka" },
  { name: "NCASL", full: "National Construction Association of Sri Lanka" },
  { name: "UDA", full: "Urban Development Authority" },
  { name: "NVQ", full: "National Vocational Qualification" },
];

const TrustLogos = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-16 border-b border-border bg-card/50" ref={ref}>
      <div className="container mx-auto px-4">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mb-8">
          Trusted by industry associations & certification bodies
        </p>
        <div
          className={`flex flex-wrap items-center justify-center gap-4 md:gap-6 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {partners.map((p, i) => (
            <div
              key={p.name}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-background border border-border hover:border-secondary/30 hover:shadow-[var(--shadow-sm)] transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
              title={p.full}
            >
              <ShieldCheck className="w-4 h-4 text-secondary/80 group-hover:text-secondary transition-colors" />
              <span className="font-display font-bold text-sm text-foreground/80 group-hover:text-foreground transition-colors">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
