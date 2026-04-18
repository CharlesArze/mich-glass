import { motion } from "motion/react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (!error) {
      setStatus("success");
      setEmail("");
      supabase.functions.invoke("welcome-email", { body: { email } });
    } else if (error.code === "23505") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="bg-black py-16 md:py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto liquid-glass rounded-2xl p-8 md:p-12 lg:p-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-heading italic text-white tracking-tight leading-[0.9] text-balance">
          Únete para descuentos exclusivos
        </h2>
        <p className="mt-4 text-white/60 font-body font-light text-sm md:text-base max-w-md mx-auto">
          Suscríbete y recibe ofertas exclusivas, novedades editoriales y recomendaciones especiales.
        </p>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-white font-body text-sm font-medium"
          >
            ¡Gracias! Ya estás suscrito. 🎉
          </motion.p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 w-full">
              <label htmlFor="newsletter-email" className="sr-only">E-Mail</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="E-Mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white font-body placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium font-body transition-colors hover:bg-white/90 whitespace-nowrap w-full sm:w-auto disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Suscribirme"}
            </button>
          </form>
        )}

        {status === "duplicate" && (
          <p className="mt-3 text-white/50 font-body text-xs">
            Este correo ya está registrado.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-white/50 font-body text-xs">
            Ocurrió un error. Inténtalo de nuevo.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Newsletter;
