"use client";

import { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Facebook, Linkedin, Youtube, Twitter, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Our Project", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top Info Bar ── */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              <span>Colombo 07, Western Province, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
              <span>8:00 AM To 10:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[13px] text-gray-500">
            <span className="font-medium">Follow Us:</span>
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Youtube, label: "YouTube" },
              { icon: Twitter, label: "X" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div
        className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-md"
          }`}
      >
        <div className="flex items-center h-[72px]">

          {/* Logo — diagonal green cutout block */}
          <div className="relative flex items-center h-full flex-shrink-0">
            {/* Green diagonal background */}
            <div
              className="absolute inset-0 bg-primary"
              style={{ clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)" }}
            />
            <a
              href="#"
              onClick={(e) => handleClick(e, "#")}
              className="relative z-10 flex items-center gap-2.5 pl-5 pr-14"
            >
              {/* Triangle icon in lime box */}
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3 L2 21 L22 21 Z" />
                  <path d="M12 11 L8 19 L16 19 Z" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-[22px] tracking-widest uppercase text-white leading-none">
                Baas<span className="text-secondary">.lk</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5 ml-6 flex-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="px-4 py-2 text-[15px] font-semibold text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Phone CTA */}
          <div className="hidden md:flex items-center pr-5 ml-auto">
            <a
              href="tel:+94112345678"
              className="flex items-center gap-2.5 bg-secondary text-primary font-bold rounded-full px-7 py-3 text-[15px] shadow-md hover:bg-secondary/90 hover:scale-105 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              +94 112 345 678
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden ml-auto mr-4 p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="border-t border-gray-100 px-4 py-4 flex flex-col gap-1 bg-white">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-semibold text-gray-700 py-2.5 px-3 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors"
                onClick={(e) => handleClick(e, l.href)}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 pb-1">
              <a
                href="tel:+94112345678"
                className="flex items-center justify-center gap-2 w-full bg-secondary text-primary font-bold rounded-full h-12 text-base"
              >
                <Phone className="w-4 h-4" /> +94 112 345 678
              </a>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;