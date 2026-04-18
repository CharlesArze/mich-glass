import { motion } from "motion/react";
import cubImg from "@/assets/cub.png";
import moonImg from "@/assets/moon.png";
import slimeeImg from "@/assets/slimee.png";

const features = [
  {
    image: cubImg,
    title: "Libros nuevos y usados",
    description: "Accede a más de 1,200 títulos en distintas condiciones. Cada libro usado pasa por una revisión de calidad antes de publicarse.",
  },
  {
    image: moonImg,
    title: "Envío rápido y seguro",
    description: "Entregamos en Arequipa en 24–48 horas y a todo el Perú. Empaquetado especial para que tus libros lleguen perfectos.",
  },
  {
    image: slimeeImg,
    title: "Envío gratuito",
    description: "Todos nuestros pedidos incluyen envío sin costo adicional. Porque lo único en lo que deberías pensar es en tu próxima lectura.",
  },
];

const Features = () => {
  return (
    <section className="relative bg-black py-16 md:py-24 px-6 overflow-hidden">
      <div className="glow-spot w-[800px] h-[400px] top-0 left-1/2 -translate-x-1/2" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest">
            Por qué MICH Bookstore
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] text-balance">
            Todo lo que un lector necesita
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative px-6 py-8 md:py-0 flex flex-col items-center text-center"
            >
              {/* Separador derecho en desktop / inferior en móvil */}
              {i < features.length - 1 && (
                <>
                  {/* Desktop: línea vertical con glow */}
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4"
                    style={{
                      background: "linear-gradient(to bottom, transparent, rgba(0,210,200,0.3) 30%, rgba(0,210,200,0.3) 70%, transparent)",
                      boxShadow: "1px 0 8px rgba(0,210,200,0.15)",
                    }}
                  />
                  {/* Móvil: línea horizontal con glow */}
                  <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4"
                    style={{
                      background: "linear-gradient(to right, transparent, rgba(0,210,200,0.3) 30%, rgba(0,210,200,0.3) 70%, transparent)",
                      boxShadow: "0 1px 8px rgba(0,210,200,0.15)",
                    }}
                  />
                </>
              )}
              <img src={feature.image} alt={feature.title} className="w-20 h-20 md:w-32 md:h-32 object-contain mb-5" />
              <h3 className="text-lg font-body font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
