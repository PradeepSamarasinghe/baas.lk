import { useEffect, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = {
  customers: [
    {
      name: "Free",
      price: "LKR 0",
      period: "forever",
      desc: "Perfect for one-off home repairs",
      features: [
        "Post up to 3 jobs/month",
        "Browse verified workers",
        "Request quotes",
        "Milestone tracking",
        "Ratings & reviews",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "LKR 1,490",
      period: "/month",
      desc: "For homeowners with ongoing projects",
      features: [
        "Unlimited job posts",
        "Priority worker matching",
        "Dedicated support",
        "Advanced milestone tools",
        "Quote comparison dashboard",
        "Dispute priority handling",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Business",
      price: "LKR 4,990",
      period: "/month",
      desc: "For construction SMEs & developers",
      features: [
        "Everything in Pro",
        "Team management",
        "Bulk job posting",
        "Analytics dashboard",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ],
  workers: [
    {
      name: "Basic",
      price: "LKR 0",
      period: "forever",
      desc: "Start getting discovered",
      features: [
        "Verified profile",
        "Receive job requests",
        "Send up to 5 quotes/month",
        "Ratings & reviews",
        "Basic profile listing",
      ],
      cta: "Join Free",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "LKR 990",
      period: "/month",
      desc: "Stand out and win more jobs",
      features: [
        "Unlimited quotes",
        "Featured profile badge",
        "Priority in search results",
        "Earnings analytics",
        "Portfolio showcase",
        "Instant job alerts",
      ],
      cta: "Go Professional",
      highlighted: true,
    },
    {
      name: "Master",
      price: "LKR 2,490",
      period: "/month",
      desc: "For top-tier professionals & teams",
      features: [
        "Everything in Professional",
        "Team sub-accounts",
        "Promoted profile",
        "Lead generation tools",
        "Training & certification",
        "Dedicated support line",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ],
};

const Pricing = () => {
  const [tab, setTab] = useState<"customers" | "workers">("customers");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const current = plans[tab];

  return (
    <section id="pricing" className="section-padding" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Simple, Transparent Plans
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-base">
            Start free and upgrade as you grow. No hidden fees.
          </p>

          <div className="inline-flex rounded-full bg-muted p-1">
            {(["customers", "workers"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  tab === t
                    ? "bg-card text-foreground shadow-[var(--shadow-sm)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                For {t === "customers" ? "Customers" : "Workers"}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-5 max-w-5xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {current.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 border transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)] duration-300 ${
                plan.highlighted
                  ? "border-secondary bg-card shadow-[var(--shadow-md)] scale-[1.02]"
                  : "border-border bg-card shadow-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-accent text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-glow">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </span>
              )}
              <h3 className="font-display font-bold text-foreground text-lg mb-1">{plan.name}</h3>
              <p className="text-xs text-muted-foreground mb-5">{plan.desc}</p>
              <div className="mb-6">
                <span className="font-display text-3xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full font-semibold h-11 ${
                  plan.highlighted
                    ? "bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90"
                    : ""
                }`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
