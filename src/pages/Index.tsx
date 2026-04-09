import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustLogos from "@/components/landing/TrustLogos";
import HowItWorks from "@/components/landing/HowItWorks";
import WorkerCategories from "@/components/landing/WorkerCategories";
import FeaturedWorkers from "@/components/landing/FeaturedWorkers";
import TrustFeatures from "@/components/landing/TrustFeatures";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import AppDownload from "@/components/landing/AppDownload";
import Faq from "@/components/landing/Faq";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/landing/ScrollToTop";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <TrustLogos />
    <HowItWorks />
    <WorkerCategories />
    <FeaturedWorkers />
    <TrustFeatures />
    <Stats />
    <Testimonials />
    <Pricing />
    <AppDownload />
    <Faq />
    <CtaSection />
    <Footer />
    <ScrollToTop />
  </div>
);

export default Index;
