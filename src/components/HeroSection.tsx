import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import BlurText from "./BlurText";

const HERO_VIDEO = "/video/less_cloud_motion_202604141850.mp4";



const HeroSection = () => {
  return (
    <section className="relative overflow-visible" style={{ height: 1000 }}>
      {/* Background video */}
      <video
        className="absolute left-0 w-full h-auto object-contain z-0"
        style={{ top: "35%" }}
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
            Nuevo
          </span>
          <span className="text-white text-xs font-medium font-body pr-3">
            Libros nuevos y usados con envíos gratis en Arequipa.
          </span>
        </div>

        {/* Heading */}
        <BlurText
          text="Tu portal a nuevas historias"
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
          Donde los libros continúan su viaje, y tú comienzas uno nuevo.
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
            Explorar librería
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 text-sm font-medium text-white font-body transition-colors hover:text-white/80"
          >
            <Play size={14} fill="white" />
            Conocer más
          </a>
        </motion.div>

        {/* Partners */}
        <div className="mt-auto pb-8 pt-16 flex flex-col items-center gap-6">
          <span className="text-4xl md:text-5xl font-heading italic text-white">
            MICH Bookstore
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;