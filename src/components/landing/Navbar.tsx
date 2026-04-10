"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Trust & Safety", href: "#trust" },
    { label: "Pricing", href: "#pricing" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-2xl shadow-[var(--shadow-md)] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4 md:px-6">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="font-display font-extrabold text-sm text-accent-foreground">B</span>
          </div>
          <span className={`font-display font-bold text-xl transition-colors duration-300 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            Baas<span className="text-secondary">.lk</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  : "text-primary-foreground/75 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className={`font-medium ${scrolled ? "text-foreground" : "text-primary-foreground hover:bg-primary-foreground/10"}`}>
            Log In
          </Button>
          <Button size="sm" className="bg-gradient-accent text-accent-foreground font-semibold shadow-glow hover:opacity-90 transition-all duration-200 hover:shadow-[0_0_50px_-8px_hsl(38_92%_50%/0.4)]">
            Get Started
          </Button>
        </div>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-foreground hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-card border-t border-border px-4 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground py-2.5 px-3 rounded-lg hover:bg-muted transition-colors"
              onClick={(e) => handleClick(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Button variant="outline" className="w-full">Log In</Button>
            <Button className="w-full bg-gradient-accent text-accent-foreground font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
