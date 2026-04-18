import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogInvitation from "@/components/CatalogInvitation";
import AboutUs from "@/components/AboutUs";
import Features from "@/components/Features";
import VideoShowcase from "@/components/VideoShowcase";
import Reviews from "@/components/Reviews";
import Merch from "@/components/Merch";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import CoinVideo from "@/components/CoinVideo";
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
      <VideoShowcase />
      <Reviews />
      {/* <Merch /> */}
      <Contact />
      <CoinVideo />
      <CallToAction />
      <Newsletter />
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Index;
