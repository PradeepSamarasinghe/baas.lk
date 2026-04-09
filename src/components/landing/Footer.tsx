import { useInView } from "@/hooks/use-in-view";

const Footer = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <footer ref={ref} className="bg-card border-t border-border py-14 md:py-16">
      <div
        className={`container mx-auto px-4 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
                <span className="font-display font-extrabold text-sm text-accent-foreground">B</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Baas<span className="text-secondary">.lk</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sri Lanka's verified labor marketplace. Connecting trusted workers with homeowners and construction SMEs.
            </p>
          </div>
          {[
            {
              title: "For Customers",
              links: ["Post a Job", "Find Workers", "How it Works", "Pricing"],
            },
            {
              title: "For Workers",
              links: ["Join as Worker", "Get Verified", "Worker Tips", "Success Stories"],
            },
            {
              title: "Company",
              links: ["About Us", "Contact", "Privacy Policy", "Terms of Service"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 Baas.lk. All rights reserved.</span>
          <span>Made with ❤️ in Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
