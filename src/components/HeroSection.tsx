import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import BlurText from "./BlurText";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const partners = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

const HeroSection = () => {
  return (
    <section className="relative overflow-visible" style={{ height: 1000 }}>
      {/* Background video */}
      <video
        className="absolute left-0 w-full h-auto object-contain z-0"
        style={{ top: "20%" }}
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/5 z-0" />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{
          height: 300,
          background: "linear-gradient(to bottom, transparent, black)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full" style={{ paddingTop: 150 }}>
        {/* Badge */}
        <div className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-8">
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">
            New
          </span>
          <span className="text-white text-xs font-medium font-body pr-3">
            Introducing AI-powered web design.
          </span>
        </div>

        {/* Heading */}
        <BlurText
          text="The Website Your Brand Deserves"
          delay={100}
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl tracking-[-4px] text-center justify-center"
        />

        {/* Subtext */}
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-sm md:text-base text-white font-body font-light leading-tight max-w-md text-center"
        >
          Stunning design. Blazing performance. Built by AI, refined by experts.
          This is web design, wildly reimagined.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-8 flex items-center gap-4"
        >
          <a
            href="#get-started"
            className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2 transition-colors hover:bg-white/10"
          >
            Get Started
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#film"
            className="flex items-center gap-2 text-sm font-medium text-white font-body transition-colors hover:text-white/80"
          >
            <Play size={14} fill="white" />
            Watch the Film
          </a>
        </motion.div>

        {/* Partners */}
        <div className="mt-auto pb-8 pt-16 flex flex-col items-center gap-6">
          <div className="liquid-glass rounded-full px-3.5 py-1">
            <span className="text-xs font-medium text-white font-body">
              Trusted by the teams behind
            </span>
          </div>
          <div className="flex items-center gap-12 md:gap-16 flex-wrap justify-center">
            {partners.map((name) => (
              <span
                key={name}
                className="text-2xl md:text-3xl font-heading italic text-white"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;