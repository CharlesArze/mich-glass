import { motion } from "motion/react";

const pillars = [
  "Libros nuevos y usados con garantía de calidad",
  "Envío a domicilio en Arequipa y a nivel nacional",
  "Catálogo actualizado con recomendaciones editoriales",
];

const AboutUs = () => {
  return (
    <section id="nosotros" className="relative bg-black pt-12 pb-12 md:py-24 px-6 overflow-hidden">
      <div className="glow-spot w-[600px] h-[600px] top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
        {/* Left — Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center text-center px-6 py-10 liquid-glass glow-card rounded-2xl overflow-hidden"
        >
          <img
            src="/video/michiglass.png"
            alt=""
            className="w-full object-contain rounded-xl mb-6"
          />
          <p className="text-xl md:text-2xl font-heading italic text-white leading-[1.1] max-w-sm">
            "Un libro es un sueño que tienes en las manos."
          </p>
          <span className="mt-6 text-white/40 font-body font-light text-sm">
            — Neil Gaiman
          </span>
        </motion.div>

        {/* Right — Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col justify-center text-center md:text-left"
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest mb-4">
            Quiénes somos
          </span>
          <h2 className="text-3xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9] mb-6 text-balance">
            Somos la librería que estabas buscando.
          </h2>
          <p className="text-white/60 font-body font-light text-sm md:text-base mb-4">
            MICH nació con una misión simple: hacer que los libros sean accesibles para todos. Creemos que el conocimiento no debería tener barreras de precio ni de distancia.
          </p>
          <p className="text-white/60 font-body font-light text-sm md:text-base">
            Ofrecemos títulos nuevos a precios justos y libros de segunda mano cuidadosamente seleccionados, porque cada libro merece seguir siendo leído.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
