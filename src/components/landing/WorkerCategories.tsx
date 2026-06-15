"use client";

import { ArrowRight, Zap, Wrench, Hammer, Paintbrush, Flame, Ruler } from "lucide-react";

const services = [
  {
    name: "Mason",
    image: "/images/services/mason.png",
    desc: "Brickwork, plastering, tiling, and full structural masonry.",
    icon: Hammer
  },
  {
    name: "Electrician",
    image: "/images/services/electrics.png",
    desc: "Full wiring, distribution panels, and solar installations.",
    icon: Zap
  },
  {
    name: "Plumber",
    image: "/images/services/general_plumbing.png",
    desc: "Pipe fitting, drainage systems, and water tank installation.",
    icon: Wrench
  },
  {
    name: "Carpenter",
    image: "/images/services/carpenter.png",
    desc: "Furniture fabrication, roof carpentry, and door fitting.",
    icon: Ruler
  },
  {
    name: "Painter",
    image: "/images/services/painter.png",
    desc: "Interior, exterior, waterproof coatings, and finishes.",
    icon: Paintbrush
  },
  {
    name: "Welder",
    image: "/images/services/welder.png",
    desc: "Steel structures, security gates, and industrial fabrication.",
    icon: Flame
  },
];

const WorkerCategories = () => {
  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:items-center text-center mb-16 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-secondary font-bold text-[13px] tracking-[0.15em] uppercase mb-4">
              Awesome Services
            </span>
            <h2 className="font-display text-[36px] md:text-[44px] font-bold text-primary leading-[1.2]">
              We Providing Helpful Services
            </h2>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.name}
                className="group bg-white rounded-[16px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-[240px] w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content Section */}
                <div className="bg-white flex flex-grow relative z-10 min-h-[160px]">

                  {/* Left Column (Icon Tab & Arrow) */}
                  <div className="w-[100px] flex-shrink-0 flex flex-col relative border-r border-gray-100">

                    {/* The Tab */}
                    <div className="absolute left-0 -top-12 w-[100px] h-[100px] rounded-tr-[30px] flex items-center justify-center z-10 bg-white group-hover:bg-secondary text-secondary group-hover:text-primary transition-colors duration-300">
                      <Icon className="w-10 h-10" strokeWidth={1.5} />

                      {/* Inner Curve (White, default) */}
                      <div
                        className="absolute right-[-20px] top-[28px] w-[20px] h-[20px] z-20 transition-opacity duration-300 group-hover:opacity-0"
                        style={{ background: `radial-gradient(circle at 100% 0%, transparent 20px, #ffffff 20px)` }}
                      />
                      {/* Inner Curve (Secondary, hover) */}
                      <div
                        className="absolute right-[-20px] top-[28px] w-[20px] h-[20px] z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle at 100% 0%, transparent 20px, hsl(var(--secondary)) 20px)` }}
                      />
                    </div>

                    {/* Arrow Container */}
                    <div className="mt-auto pb-6 pt-16 flex justify-center w-full z-10">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-[18px] h-[18px] text-primary/40 group-hover:text-secondary transition-colors" />
                      </div>
                    </div>

                  </div>

                  {/* Right Column (Text) */}
                  <div className="flex-grow pt-7 pb-6 pr-6 pl-5">
                    <h3 className="text-[20px] font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-primary/60 text-[14px] leading-[1.7]">
                      {service.desc}
                    </p>
                  </div>

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