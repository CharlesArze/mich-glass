import { motion } from "motion/react";

const pillars = [
  "Libros nuevos y usados con garantía de calidad",
  "Envío a domicilio en Arequipa y a nivel nacional",
  "Catálogo actualizado con recomendaciones editoriales",
];

const AboutUs = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Left — Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center text-center px-6 py-16 liquid-glass rounded-2xl"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-heading italic text-white leading-[1.1] max-w-sm">
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
          className="flex flex-col justify-center"
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest mb-4">
            Quiénes somos
          </span>
          <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9] mb-6">
            Somos la librería que Arequipa necesitaba.
          </h2>
          <p className="text-white/60 font-body font-light text-sm md:text-base mb-4">
            MICH nació con una misión simple: hacer que los libros sean accesibles para todos. Creemos que el conocimiento no debería tener barreras de precio ni de distancia.
          </p>
          <p className="text-white/60 font-body font-light text-sm md:text-base mb-8">
            Ofrecemos títulos nuevos a precios justos y libros de segunda mano cuidadosamente seleccionados, porque cada libro merece seguir siendo leído.
          </p>

          <ul className="space-y-3">
            {pillars.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-white/60 shrink-0" />
                <span className="text-white/70 font-body font-light text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
