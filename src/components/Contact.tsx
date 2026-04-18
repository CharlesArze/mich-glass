import { motion } from "motion/react";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <section id="servicios" className="bg-black pt-16 md:pt-24 pb-8 px-6">
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

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a href="mailto:michbookstore@gmail.com"
              className="flex items-center gap-2 text-white/70 font-body text-sm hover:text-white transition-colors">
              <Mail size={16} />
              michbookstore@gmail.com
            </a>
            <a href="tel:+51903576755"
              className="flex items-center gap-2 text-white/70 font-body text-sm hover:text-white transition-colors">
              <Phone size={16} />
              +51 903 576 755
            </a>
          </div>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a href="https://www.instagram.com/mich.bookstore/" target="_blank" rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2 transition-colors hover:bg-white/10">
              <Instagram size={16} />
              @mich.bookstore
            </a>
            <a href="https://www.facebook.com/share/14XQHKan687/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2 transition-colors hover:bg-white/10">
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
