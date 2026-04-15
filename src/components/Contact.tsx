import { motion } from "motion/react";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
            Contáctanos
          </h2>
          <p className="mt-6 text-white/60 font-body font-light text-sm md:text-base max-w-md mx-auto">
            Estamos aquí para ayudarte. Escríbenos o llámanos, respondemos a la brevedad.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:hola@michbookstore.com"
              className="flex items-center gap-2 text-white/70 font-body text-sm hover:text-white transition-colors"
            >
              <Mail size={16} />
              hola@michbookstore.com
            </a>
            <a
              href="tel:+51999999999"
              className="flex items-center gap-2 text-white/70 font-body text-sm hover:text-white transition-colors"
            >
              <Phone size={16} />
              +51 999 999 999
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/michbookstore"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2 transition-colors hover:bg-white/10"
            >
              <Instagram size={16} />
              Síguenos en Instagram
            </a>
            <a
              href="https://www.facebook.com/michbookstore"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2 transition-colors hover:bg-white/10"
            >
              <Facebook size={16} />
              Síguenos en Facebook
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
