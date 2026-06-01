"use client";
import { Check, Play, ArrowRight } from "lucide-react";
import Image from "next/image";

const TrustFeatures = () => {
    const checkItems = [
        "Locally Owned & Operated",
        "Certified Professionals",
        "Always Here For You",
        "Professional Workers"
    ];
    const stats = [
        { value: "10K", label: "Worker Connects" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "20K", label: "Jobs Completed" }
    ];
    return (
        <section id="about" className="py-10 md:py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8 items-center">

                    {/* Left Column: Image, Experience Badge, and Stats */}
                    <div className="lg:col-span-6 relative flex flex-col gap-6">
                        <div className="relative">
                            {/* Experience Badge overlay */}
                            <div className="absolute top-4 left-4 z-20 bg-[#badb27] text-[#0a3a30] px-4 py-3 rounded-xl shadow-xl flex items-center gap-2">
                                <span className="text-3xl font-black leading-none">10+</span>
                                <span className="text-xs font-bold leading-tight flex flex-col">
                                    <span>Years Of</span>
                                    <span>Experience</span>
                                </span>
                            </div>

                            {/* Main Image */}
                            <div className="relative w-full h-[280px] md:h-[360px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                <Image
                                    src="/images/about_plumber.jpg"
                                    alt="Plumber fixing sink pipe"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mt-2">
                            {stats.map((s) => (
                                <div key={s.label} className="text-center md:text-left">
                                    <div className="text-2xl md:text-3xl font-black text-[#0a3a30] leading-none mb-1">
                                        {s.value}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider leading-tight">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right Column: Copy, Checkmarks, CTA, Video Thumbnail */}
                    <div className="lg:col-span-6 flex flex-col justify-center">

                        {/* Section Tag */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="relative flex items-center">
                                <div className="w-4 h-4 rounded-full bg-[#badb27]"></div>
                                <ArrowRight className="w-3 h-3 text-[#0a3a30] absolute -right-1.5" />
                                <div className="w-3 h-[1px] bg-[#0a3a30] absolute left-2"></div>
                            </div>
                            <span className="text-[#0a3a30] font-bold text-xs tracking-wide ml-3">
                                About Us
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-sans font-black text-3xl md:text-4xl text-[#0a3a30] leading-[1.1] mb-4 uppercase">
                            MEET THE TEAM BEHIND BAAS.LK
                        </h2>
                        {/* Description */}
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                            At Baas.lk, we're more than just a platform; we are a dedicated team of problem solvers committed to keeping your projects running smoothly with verified Sri Lankan talent.
                        </p>
                        {/* 2x2 Checklist Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6">
                            {checkItems.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#badb27] flex items-center justify-center shrink-0 shadow-sm">
                                        <Check className="w-2.5 h-2.5 text-[#0a3a30] stroke-[4]" />
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-[#0a3a30]">{item}</span>
                                </div>
                            ))}
                        </div>
                        {/* Action Button & Video Container */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-1 justify-start">
                            <a
                                href="#services"
                                className="bg-[#badb27] hover:bg-[#a9c920] text-[#0a3a30] font-black text-sm px-6 py-3.5 rounded-full shadow-md text-center transition-all duration-200 shrink-0"
                            >
                                Get Help Now
                            </a>

                            {/* Video Preview Card */}
                            <div className="relative group overflow-hidden bg-gray-100 rounded-xl h-[56px] w-[200px] shrink-0 flex items-center px-3 gap-3 border border-gray-100 shadow-md">
                                <Image
                                    src="/images/about_video.jpg"
                                    alt="Video thumbnail"
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-[#0a3a30]/40" />
                                {/* Play Button */}
                                <div className="relative z-10 w-8 h-8 shrink-0 rounded-full bg-[#badb27] flex items-center justify-center text-[#0a3a30] shadow-md group-hover:scale-110 transition-transform">
                                    <Play className="w-3 h-3 fill-[#0a3a30] text-[#0a3a30] ml-0.5" />
                                </div>
                                <div className="relative z-10 text-white text-[10px] font-bold leading-tight">
                                    Watch Our<br />Service Video
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default TrustFeatures;