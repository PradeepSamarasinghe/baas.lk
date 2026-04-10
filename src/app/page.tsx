// Force re-scan
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import WorkerCategories from "@/components/landing/WorkerCategories";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedWorkers from "@/components/landing/FeaturedWorkers";
import TrustFeatures from "@/components/landing/TrustFeatures";
import AppDownload from "@/components/landing/AppDownload";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/landing/ScrollToTop";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <WorkerCategories />
        <FeaturedWorkers />
        <TrustFeatures />
        <Stats />
        <Testimonials />
        <AppDownload />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
