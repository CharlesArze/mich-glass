import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CatalogInvitation = () => {
  return (
    <section className="relative bg-black pt-[calc(4rem+70px)] pb-8 md:py-32 px-6 overflow-hidden">
      <div className="glow-spot w-[600px] h-[400px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glow-heading text-3xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] text-balance"
        >
          Cada libro tiene su lector esperando.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-white/60 font-body font-light text-lg md:text-xl"
        >
          ¿Será el tuyo el próximo?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Link
            to="/libreria"
            className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body transition-colors hover:bg-white/90"
          >
            Explorar librería
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogInvitation;
