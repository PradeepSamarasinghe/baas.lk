"use client";

import { ArrowRight } from "lucide-react";

const blogs = [
  {
    date: { day: "28", month: "June" },
    category: "Plumber",
    comments: 3,
    title: "How to painting Work in Outdoor",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    image: "/images/blog/1.png",
  },
  {
    date: { day: "28", month: "June" },
    category: "Electrician",
    comments: 3,
    title: "5 Way to Installing a Water Filter",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    image: "/images/blog/2.png",
  },
  {
    date: { day: "28", month: "June" },
    category: "Handyman",
    comments: 3,
    title: "Tips For Cleaning Your Kitchen",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    image: "/images/blog/3.png",
  },
];

const Faq = () => {
  return (
    <section id="blog" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:items-center text-center mb-16 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-secondary font-bold text-[13px] tracking-[0.15em] uppercase mb-4">
              Latest Blog
            </span>
            <h2 className="font-display text-[36px] md:text-[44px] font-bold text-primary leading-[1.2]">
              Latest Legal Updates
            </h2>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {blogs.map((blog) => (
            <div 
              key={blog.title}
              className="group bg-white rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col relative"
            >
              {/* Date Tab */}
              <div className="absolute -top-4 left-6 bg-white border-t-[3px] border-secondary shadow-md pt-2 pb-2.5 px-4 rounded-b-xl flex flex-col items-center justify-center z-20">
                <span className="text-[22px] font-bold text-primary leading-none mb-1">{blog.date.day}</span>
                <span className="text-[12px] font-semibold text-primary/60 capitalize leading-none">{blog.date.month}</span>
              </div>

              {/* Image Section */}
              <div className="relative h-[240px] w-full overflow-hidden rounded-t-[16px]">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Category Tab */}
                <div className="absolute bottom-0 left-0 bg-secondary text-primary px-6 py-2.5 rounded-tr-[24px] font-bold text-[13px] flex items-center gap-2 z-10">
                  {blog.category} <span className="opacity-40 font-normal">/</span> {blog.comments} Comments
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-white flex flex-col flex-grow relative z-10 p-8 rounded-b-[16px]">
                <h3 className="text-[20px] font-bold text-primary mb-3 leading-[1.4] group-hover:text-secondary transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-primary/60 text-[15px] leading-[1.7] mb-8 flex-grow">
                  {blog.desc}
                </p>
                
                <div className="mt-auto">
                  <a href="#" className="inline-flex items-center gap-2 text-[14px] font-bold text-primary hover:text-secondary transition-colors group/link">
                    Read More 
                    <ArrowRight className="w-[18px] h-[18px] group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;
