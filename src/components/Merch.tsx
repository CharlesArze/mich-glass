import { motion } from "motion/react";

const Merch = () => {
  return (
    <section className="bg-black py-24 px-6 opacity-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest">
            MICH Merch
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] text-balance">
            Para los que viven entre páginas
          </h2>
          <p className="mt-6 text-white/60 font-body font-light text-sm md:text-base max-w-md mx-auto">
            Nuestro merch oficial está en camino. Pronto podrás llevar MICH contigo a todas partes.
          </p>
          <div className="mt-10">
            <span className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-white font-body">
              Próximamente
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Merch;
