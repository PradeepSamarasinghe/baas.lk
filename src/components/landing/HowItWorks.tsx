"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { num: "01", title: "Post a Job", desc: "Tell us what you need done, when, and where. It takes less than 2 minutes." },
  { num: "02", title: "Get Quotes", desc: "Receive competitive quotes from verified professionals in your area." },
  { num: "03", title: "We Match You", desc: "Review profiles, ratings, and choose the best worker for your budget." },
  { num: "04", title: "Satisfaction Guaranteed", desc: "Pay securely upon milestone completion. We guarantee your satisfaction." },
];

const HowItWorks = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-secondary"></div>
            <span className="text-secondary font-bold text-lg tracking-wider uppercase">Our Process</span>
            <div className="w-8 h-[2px] bg-secondary"></div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
            How Baas.lk Works
          </h2>
        </div>

        {/* Center Graphic Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Image (Hidden on mobile) */}
          <div className={`hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-8 border-secondary overflow-hidden shadow-2xl z-10 transition-all duration-1000 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <img 
              src="https://picsum.photos/400/400?random=10" 
              alt="Process" 
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/20"></div>
          </div>

          {/* Dotted Connection Circle (Hidden on mobile) */}
          <div className={`hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-2 border-dashed border-primary/20 -z-10 transition-all duration-1000 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}></div>

          {/* Steps Grid */}
          <div className="grid lg:grid-cols-2 gap-y-12 lg:gap-y-32 gap-x-12 lg:gap-x-0 relative z-20">
            {steps.map((step, idx) => {
              // Layout positioning for desktop to push items outward
              const isLeft = idx % 2 === 0;
              const isTop = idx < 2;
              
              return (
                <div 
                  key={step.num}
                  className={`flex gap-5 lg:w-[350px] transition-all duration-700
                    ${isLeft ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}
                    ${isTop ? "lg:-mt-10" : "lg:-mb-10"}
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  `}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-display text-2xl font-bold shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-primary/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;