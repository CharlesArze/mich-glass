import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest">
            ¿Listo para empezar?
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Tu próximo libro favorito está aquí.
          </h2>
          <p className="mt-6 text-white/60 font-body font-light text-sm md:text-base max-w-md mx-auto">
            Miles de títulos nuevos y usados esperándote. Envío gratuito a todo el Perú.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body transition-colors hover:bg-white/90"
            >
              Explorar librería
              <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white font-body transition-colors hover:bg-white/10"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
