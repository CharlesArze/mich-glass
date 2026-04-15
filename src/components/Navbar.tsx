import { ArrowUpRight } from "lucide-react";

const navLinks = ["Inicio", "Servicios", "Catálogo", "Nosotros", "Perfil"];

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <span className="font-heading italic text-lg text-white">S</span>
        </div>
      </div>

      {/* Center nav links */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="px-3 py-2 text-sm font-medium text-white/90 font-body rounded-full transition-colors hover:bg-white/10"
          >
            {link}
          </a>
        ))}
        <a
          href="#get-started"
          className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body transition-colors hover:bg-white/90"
        >
          Explorar librería
          <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Spacer for layout balance */}
      <div className="w-10" />
    </nav>
  );
};

export default Navbar;