import { Shield, Camera, FileCheck, BadgeCheck, MessageSquareWarning, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: FileCheck, title: "NIC Verification", desc: "Every worker's National Identity Card is verified before they can accept jobs." },
  { icon: Camera, title: "Selfie Match", desc: "Real-time selfie verification ensures the person matches their ID photo." },
  { icon: BadgeCheck, title: "Trade Certifications", desc: "Workers upload certifications validated by our team for added trust." },
  { icon: Shield, title: "Work Proof System", desc: "Photo and video proof at every milestone — full transparency for customers." },
  { icon: Star, title: "Verified Reviews", desc: "Only customers who completed a job can leave reviews. No fake ratings." },
  { icon: MessageSquareWarning, title: "Dispute Resolution", desc: "Fair, transparent dispute management with admin mediation for both parties." },
];

const TrustFeatures = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="trust" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-xs font-semibold uppercase tracking-wider mb-4">
            Trust & Safety
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Built on Verification,<br />Not Guesswork
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Every layer of Baas.lk is designed to create genuine trust between workers and customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group bg-card border border-border rounded-2xl p-6 shadow-card hover:border-success/30 transition-all duration-500 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-5 group-hover:bg-success/15 transition-colors">
                  <Icon className="w-5.5 h-5.5 text-success" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;
