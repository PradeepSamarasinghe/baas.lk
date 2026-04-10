"use client";

import { useInView } from "@/hooks/use-in-view";

const Footer = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <footer ref={ref} className="bg-white border-t border-gray-100 py-14 md:py-16">
      <div
        className={`max-w-7xl mx-auto px-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#F59E0B] flex items-center justify-center">
                <span className="font-black text-sm text-[#0B1628]">B</span>
              </div>
              <span className="font-black text-lg text-gray-900">
                Baas<span className="text-[#F59E0B]">.lk</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Sri Lanka's verified labor marketplace. Connecting trusted workers with homeowners and construction SMEs.
            </p>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">For Customers</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {["Post a Job", "Find Workers", "How it Works", "Pricing"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-gray-900 transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">For Workers</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {["Join as Worker", "Get Verified", "Worker Tips", "Success Stories"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-gray-900 transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-gray-900 transition-colors duration-200">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>© 2026 Baas.lk. All rights reserved.</span>
          <span>Made with ❤️ in Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;