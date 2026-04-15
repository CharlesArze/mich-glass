import { motion } from "motion/react";
import { Star } from "lucide-react";

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
            Reseñas
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Lo que dicen nuestros lectores
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="liquid-glass rounded-2xl p-8 flex flex-col"
            >
              <span className="text-5xl font-heading italic text-white/20 leading-none mb-4">
                "
              </span>
              <p className="text-white/70 font-body font-light text-sm italic leading-relaxed flex-1">
                {review.text}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-white/50 font-body text-sm">
                  {review.name}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-white/80 fill-white/80"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
