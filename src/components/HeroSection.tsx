import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import BlurText from "./BlurText";

const HERO_IMAGE = "/video/tint_only_the_202604141440-2.png_202604141520.jpeg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [imageTop, setImageTop] = useState<number>(350);

  useEffect(() => {
    const update = () => {
      if (!buttonRef.current || !sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isMobile = sectionRect.width < 768;
      const offset = isMobile ? 100 : 230;
      setImageTop(buttonRect.top - sectionRect.top - offset);
    };

    update();

    const ro = new ResizeObserver(update);
    if (sectionRef.current) ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden h-[calc(100svh-60px)] sm:h-[860px] md:h-[1000px]">
      {/* Background image */}
      <img
        className="absolute z-0 w-full object-cover"
        style={{
          top: imageTop,
          height: "min(810px, 110vw)",
          objectPosition: "center top",
          transition: "top 0.15s ease",
        }}
        src={HERO_IMAGE}
        alt=""
      />


      {/* Vignette bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none h-[80px] sm:h-[120px] md:h-[180px]"
        style={{ background: "linear-gradient(to bottom, transparent, black)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full pt-[84px] md:pt-[105px] px-5 md:px-0">
        {/* Badge */}
        <div className="liquid-glass rounded-full px-4 py-2 flex items-center mb-6 md:mb-8">
          <span className="text-white text-xs font-medium font-body">
            Envíos gratis en Arequipa
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center">
          <BlurText
            text="Tu portal a"
            delay={100}
            className="font-heading italic text-white leading-[0.85] tracking-[-2px] md:tracking-[-4px] justify-center [font-size:clamp(3.4rem,6.5vw,5.5rem)]"
          />
          <BlurText
            text="nuevas historias"
            delay={100}
            className="font-heading italic text-white leading-[0.85] tracking-[-2px] md:tracking-[-4px] justify-center [font-size:clamp(3.4rem,6.5vw,5.5rem)]"
          />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 md:mt-6 text-sm md:text-base text-white font-body font-light leading-tight max-w-xs sm:max-w-md text-center"
        >
          Donde los libros continúan su viaje, y tú comienzas uno nuevo.
        </motion.p>

        {/* Anchor for video positioning */}
        <div ref={buttonRef} className="mt-6 md:mt-8" />

      </div>
    </section>
  );
};

export default HeroSection;
