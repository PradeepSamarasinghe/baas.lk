import { useEffect, useRef, useState } from "react";
import { Star, BadgeCheck, MapPin, Briefcase } from "lucide-react";

const workers = [
  {
    name: "Ruwan Silva",
    trade: "Master Mason",
    location: "Colombo",
    rating: 4.9,
    reviews: 128,
    jobs: 340,
    skills: ["Brickwork", "Plastering", "Tiling"],
    avatar: "RS",
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Kamal Perera",
    trade: "Electrician",
    location: "Kandy",
    rating: 4.8,
    reviews: 96,
    jobs: 215,
    skills: ["Wiring", "Panel Installation", "Solar"],
    avatar: "KP",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Nimal Jayasinghe",
    trade: "Plumber",
    location: "Galle",
    rating: 4.9,
    reviews: 74,
    jobs: 180,
    skills: ["Pipe Fitting", "Drainage", "Water Tanks"],
    avatar: "NJ",
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "Pradeep Kumara",
    trade: "Carpenter",
    location: "Negombo",
    rating: 4.7,
    reviews: 63,
    jobs: 152,
    skills: ["Furniture", "Roofing", "Doors & Windows"],
    avatar: "PK",
    color: "from-emerald-500 to-teal-600",
  },
];

const FeaturedWorkers = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Top Professionals
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Featured Verified Workers
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Meet some of our highest-rated, fully verified professionals ready to take on your next project.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {workers.map((w, i) => (
            <div
              key={w.name}
              className={`group bg-card border border-border rounded-2xl p-5 shadow-card transition-all duration-700 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1.5 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Avatar & Verified Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${w.color} flex items-center justify-center shrink-0 ring-2 ring-background shadow-sm`}>
                  <span className="text-sm font-bold text-primary-foreground">{w.avatar}</span>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-card flex items-center justify-center shadow-sm">
                    <BadgeCheck className="w-4 h-4 text-secondary fill-secondary/20" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-foreground text-sm truncate">{w.name}</h3>
                  <p className="text-xs text-muted-foreground">{w.trade}</p>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {w.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {w.jobs} jobs
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                  <span className="text-sm font-bold text-foreground">{w.rating}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  ({w.reviews} reviews)
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {w.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full py-2.5 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-gradient-accent hover:text-accent-foreground hover:border-transparent hover:shadow-glow transition-all duration-300">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;
