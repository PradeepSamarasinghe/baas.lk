"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const CtaSection = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="workers" className="py-20 md:py-28 bg-gradient-hero relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/8 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight tracking-tight">
            Ready to Build<br />Something Great?
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Join Sri Lanka's most trusted construction marketplace. Whether you're hiring or looking for work — start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-accent text-accent-foreground font-bold text-base shadow-glow animate-pulse-glow hover:opacity-90 transition-all px-8 h-12">
              Find a Worker <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-bg-primary-foreground hover:bg-primary-foreground/10 font-bold text-base px-8 h-12">
              Join as a Worker
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;