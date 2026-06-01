"use client";
import { Mail, MapPin, Phone, Globe, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
const Footer = () => {
  return (
    <footer id="footer" className="bg-[#f6f8f7] border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand/About (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#badb27] flex items-center justify-center">
                <span className="font-extrabold text-[#0a3a30] text-lg">B</span>
              </div>
              <span className="font-sans font-black tracking-wider text-xl text-[#0a3a30]">
                BAAS<span className="text-[#badb27]">.LK</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Sri Lanka's leading verified labor connection platform. We match certified masons, plumbers, electricians, carpenters, painters, and welders with homeowners and businesses for seamless jobs.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-[#badb27] hover:text-[#0a3a30] hover:border-transparent flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-[#badb27] hover:text-[#0a3a30] hover:border-transparent flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-[#badb27] hover:text-[#0a3a30] hover:border-transparent flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:bg-[#badb27] hover:text-[#0a3a30] hover:border-transparent flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Quick Links (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-[#0a3a30] text-sm uppercase tracking-wider mb-6">Quick Link</h4>
            <ul className="space-y-3.5 text-sm text-gray-500 font-medium">
              <li>
                <a href="#about" className="hover:text-[#badb27] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#badb27] transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#badb27] transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#footer" className="hover:text-[#badb27] transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          {/* Contact Info (Col span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-black text-[#0a3a30] text-sm uppercase tracking-wider mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#badb27] shrink-0 mt-0.5" />
                <span>+94 77 568 9783</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#badb27] shrink-0 mt-0.5" />
                <span>Kaduwela, Colombo</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#badb27] shrink-0 mt-0.5" />
                <span>info@baaslk.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#badb27] shrink-0 mt-0.5" />
                <span>www.baaslk.com</span>
              </li>
            </ul>
          </div>
          {/* Working Hours (Col span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-black text-[#0a3a30] text-sm uppercase tracking-wider mb-6">Working Hours</h4>
            <ul className="space-y-3.5 text-sm text-gray-500 font-medium">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Mon - Fri</span>
                <span className="font-bold text-[#0a3a30]">7:00am - 9:00pm</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Sat - Sun</span>
                <span className="font-bold text-[#0a3a30]">8:00am - 6:00pm</span>
              </li>
              <li className="flex justify-between">
                <span>Holiday</span>
                <span className="font-bold text-red-500">Closed</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom copyright bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <span>© Copyright 2026 Baas.lk | All Rights Reserved</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#badb27] transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-[#badb27] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;