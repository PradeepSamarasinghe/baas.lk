"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does worker verification work?",
    a: "Every worker goes through a 3-step verification: NIC document check, live selfie match, and trade certification review. Only workers who pass all steps receive the verified badge.",
  },
  {
    q: "Is Baas.lk free to use for customers?",
    a: "Yes — posting jobs, browsing workers, and requesting quotes is completely free. You only pay the worker directly for the agreed work.",
  },
  {
    q: "How do workers get paid?",
    a: "Payments are managed through our milestone system. Customers release payments as each milestone is completed and approved, ensuring fair compensation for quality work.",
  },
  {
    q: "What happens if there's a dispute?",
    a: "Our dedicated trust & safety team reviews all disputes. Both parties can submit evidence, and we mediate to reach a fair resolution — usually within 48 hours.",
  },
  {
    q: "How do I sign up as a worker?",
    a: "Download the app, select 'Worker' during registration, complete your profile with trade details, and submit your verification documents. Most workers are verified within 24 hours.",
  },
  {
    q: "Can I hire workers for recurring jobs?",
    a: "Absolutely. Once you've worked with a verified professional, you can rehire them directly from your history — no need to post a new job each time.",
  },
];

const FaqItem = ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) => (
  <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${open ? "border-secondary/30 shadow-[var(--shadow-sm)] bg-card" : "border-border hover:border-secondary/20"}`}>
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
    >
      <span className="font-display font-semibold text-[15px] text-foreground">{q}</span>
      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${open ? "bg-secondary/10 rotate-180" : "bg-muted"}`}>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
    >
      <div className="overflow-hidden">
        <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="section-header">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Everything you need to know about hiring and working on Baas.lk.
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto flex flex-col gap-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
