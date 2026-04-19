import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative bg-black pt-8 pb-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glow-spot w-[700px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest">
            ¿Listo para empezar?
          </span>
          <h2 className="glow-heading mt-4 text-3xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] text-balance">
            Tu próximo libro favorito está aquí.
          </h2>
          <p className="mt-6 text-white/60 font-body font-light text-sm md:text-base max-w-md mx-auto">
            Miles de títulos nuevos y usados esperándote. Envío gratuito a todo el Perú.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/libreria"
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body transition-colors hover:bg-white/90"
            >
              Explorar librería
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/51903576755"
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
