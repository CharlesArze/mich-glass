import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogInvitation from "@/components/CatalogInvitation";
import AboutUs from "@/components/AboutUs";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Merch from "@/components/Merch";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const Index = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <CatalogInvitation />
      <AboutUs />
      <Features />
      <Reviews />
      <Merch />
      <Newsletter />
      <Contact />
      <CallToAction />
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Index;
