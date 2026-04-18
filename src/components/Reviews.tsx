import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "El libro llegó en perfectas condiciones y antes de lo que esperaba. No podía creer lo rápido que fue el envío.",
    name: "Valeria S.",
  },
  {
    text: "Llevaba meses buscando un título que no encontraba en ningún lado. En MICH lo hallé usado, casi nuevo y a un precio increíble.",
    name: "Diego F.",
  },
  {
    text: "Pedí tres libros a la vez y llegaron perfectamente empaquetados. Se nota que les importa el detalle.",
    name: "Camila R.",
  },
  {
    text: "Una librería honesta, con buenos precios y atención rápida. Ya es mi primera opción cada vez que quiero un libro nuevo.",
    name: "Rodrigo M.",
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => goTo((current - 1 + reviews.length) % reviews.length);
  const next = () => goTo((current + 1) % reviews.length);

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="glow-spot w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-medium text-white/40 uppercase tracking-widest">
            Reseñas
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] text-balance">
            Lo que dicen nuestros lectores
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="liquid-glass glow-card rounded-2xl p-10 flex flex-col min-h-[220px] relative overflow-hidden"
            >
              {/* Vignette lateral */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-10 rounded-l-2xl" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-10 rounded-r-2xl" />
              <span className="text-5xl font-heading italic text-white/20 leading-none mb-4">"</span>
              <p className="text-white/70 font-body font-light text-base italic leading-relaxed flex-1">
                {reviews[current].text}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-white/50 font-body text-sm">{reviews[current].name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-white/80 fill-white/80" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={prev}
              className="liquid-glass rounded-full p-2.5 text-white/70 hover:text-white transition-colors shrink-0"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1 flex-1">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative h-[2px] flex-1 rounded-full overflow-visible bg-white/10 transition-colors"
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-400 origin-left ${
                      i === current ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={i === current ? {
                      background: "rgba(0, 210, 200, 0.9)",
                      boxShadow: "0 0 6px rgba(0,210,200,0.8), 0 0 12px rgba(0,210,200,0.4)",
                    } : {}}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="liquid-glass rounded-full p-2.5 text-white/70 hover:text-white transition-colors shrink-0"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
