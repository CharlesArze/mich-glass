import { Instagram, Facebook } from "lucide-react";

const navLinks = ["Inicio", "Nosotros", "Categorías", "Blog"];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
        <div>
          <span className="text-xl font-heading italic text-white">MICH Bookstore</span>
          <p className="mt-3 text-white/40 font-body font-light text-sm leading-relaxed">
            Lecturas que te transforman.<br />Todos los derechos reservados.
          </p>
        </div>

        <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-3 flex-wrap">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-white/50 font-body text-sm hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <a href="mailto:hola@michbookstore.com"
            className="text-white/50 font-body text-sm hover:text-white transition-colors">
            hola@michbookstore.com
          </a>
          <div className="flex items-center gap-4 mt-1">
            <a href="https://www.instagram.com/michbookstore" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/michbookstore" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center">
        <span className="text-white/30 font-body text-xs">© {year} MICH Bookstore</span>
      </div>
    </footer>
  );
};

export default Footer;
