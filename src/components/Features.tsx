import { motion } from "motion/react";
import { BookOpen, Truck, Gift } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Libros nuevos y usados",
    description:
      "Accede a más de 1,200 títulos en distintas condiciones. Cada libro usado pasa por una revisión de calidad antes de publicarse.",
  },
  {
    icon: Truck,
    title: "Envío rápido y seguro",
    description:
      "Entregamos en Arequipa en 24–48 horas y a todo el Perú. Empaquetado especial para que tus libros lleguen perfectos.",
  },
  {
    icon: Gift,
    title: "Envío gratuito",
    description:
      "Todos nuestros pedidos incluyen envío sin costo adicional. Porque lo único en lo que deberías pensar es en tu próxima lectura.",
  },
];

const Features = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest">
            Por qué MICH Bookstore
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Todo lo que un lector necesita
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="px-6 py-8 md:py-0 flex flex-col"
            >
              <feature.icon size={28} className="text-white/70 mb-5" />
              <h3 className="text-lg font-body font-medium text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
