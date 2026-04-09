import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kumara Bandara",
    role: "Homeowner, Colombo",
    text: "Found a verified electrician within hours. The milestone tracking gave me full confidence — I could see every step of the work.",
    rating: 5,
    avatar: "KB",
  },
  {
    name: "Saman Perera",
    role: "Master Mason, Kandy",
    text: "Baas.lk helped me get consistent work. The verification badge makes customers trust me immediately. My income has doubled.",
    rating: 5,
    avatar: "SP",
  },
  {
    name: "Dilani Fernando",
    role: "Property Developer, Galle",
    text: "Managing multiple projects with different contractors used to be chaos. Now I track everything on one platform. Game changer.",
    rating: 5,
    avatar: "DF",
  },
];

const Testimonials = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Real stories from real customers and workers on Baas.lk.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`relative bg-card border border-border rounded-2xl p-6 shadow-card transition-all duration-700 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Quote className="w-8 h-8 text-secondary/15 absolute top-5 right-5" />

              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-accent-foreground">{t.avatar}</span>
                </div>
                <div>
                  <div className="font-display font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
