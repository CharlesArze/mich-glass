import { motion } from "motion/react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-black py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto liquid-glass rounded-2xl p-12 md:p-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9]">
          Únete para descuentos exclusivos
        </h2>
        <p className="mt-4 text-white/60 font-body font-light text-sm md:text-base max-w-md mx-auto">
          Suscríbete y recibe ofertas exclusivas, novedades editoriales y recomendaciones especiales.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
        >
          <div className="flex-1 w-full">
            <label htmlFor="newsletter-email" className="sr-only">
              E-Mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="E-Mail *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white font-body placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body transition-colors hover:bg-white/90 whitespace-nowrap"
          >
            Suscribirme
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
