import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X, ChevronDown, User, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Servicios', href: '/#servicios' },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 lg:px-16 py-3">
        {/* Logo */}
        <div className="flex-1 flex items-center gap-2">
          <Link to="/" className="liquid-glass rounded-full px-3.5 py-1 hover:bg-white/[0.15] transition-colors">
            <span className="text-xs font-medium text-white font-body">MICH Bookstore</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3 py-2 text-sm font-medium text-white/90 font-body rounded-full transition-colors hover:bg-white/10"
            >
              {label}
            </a>
          ))}
          <a
            href="/#get-started"
            className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body transition-colors hover:bg-white/90"
          >
            Explorar librería
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Auth — Desktop */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-2">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="flex items-center gap-2 liquid-glass rounded-full px-3.5 py-1.5 text-sm font-medium text-white/90 font-body hover:bg-white/[0.15] transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                  {user.firstName?.[0]?.toUpperCase() || '?'}
                </span>
                {user.firstName}
                <ChevronDown size={13} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 z-50 liquid-glass rounded-2xl overflow-hidden min-w-[170px]"
                    >
                      <div className="py-2 px-2 space-y-0.5">
                        <Link
                          to="/perfil"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-body text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <User size={14} />
                          Mi perfil
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin/libros"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-body text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                          >
                            <Shield size={14} />
                            Admin libros
                          </Link>
                        )}
                        <div className="h-px bg-white/10 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-body text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <LogOut size={14} />
                          Cerrar sesión
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-sm font-medium text-white/80 font-body hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body transition-colors hover:bg-white/90"
              >
                Registro
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {isAuthenticated && user && (
            <button
              onClick={() => setOpen(v => !v)}
              className="liquid-glass rounded-full px-2.5 py-1.5 flex items-center gap-2 text-white transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                {user.firstName?.[0]?.toUpperCase() || '?'}
              </span>
              <span className="text-xs font-medium font-body">{user.firstName}</span>
            </button>
          )}
        <button
          className="liquid-glass rounded-full p-2.5 text-white transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label="Menú"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="block">
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)} />

            <motion.div key="panel" initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-[5.5rem] left-4 right-4 z-50 md:hidden liquid-glass rounded-2xl overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                    className="px-3 py-3 text-base font-medium text-white/90 font-body rounded-xl transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="h-px bg-white/10 my-2" />

                <motion.a href="/#get-started" onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + NAV_LINKS.length * 0.05, duration: 0.25 }}
                  className="flex items-center justify-between px-3 py-3 text-base font-medium text-white font-body rounded-xl transition-colors hover:bg-white/10"
                >
                  Explorar librería
                  <ArrowUpRight size={16} />
                </motion.a>

                <div className="h-px bg-white/10 my-2" />

                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 mb-1">
                      <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold text-white">
                        {user.firstName?.[0]?.toUpperCase() || '?'}
                      </span>
                      <span className="text-sm font-medium text-white font-body">{user.firstName}</span>
                    </div>
                    <Link to="/perfil" onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-3 py-3 text-base font-medium text-white/85 font-body rounded-xl transition-colors hover:bg-white/10">
                      <User size={16} />
                      Mi perfil
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin/libros" onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-3 py-3 text-base font-medium text-white/85 font-body rounded-xl transition-colors hover:bg-white/10">
                        <Shield size={16} />
                        Admin libros
                      </Link>
                    )}
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-3 py-3 text-base font-medium text-white/60 font-body rounded-xl transition-colors hover:bg-white/10">
                      <LogOut size={16} />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}
                      className="px-3 py-3 text-base font-medium text-white/85 font-body rounded-xl transition-colors hover:bg-white/10">
                      Iniciar sesión
                    </Link>
                    <Link to="/registro" onClick={() => setOpen(false)}
                      className="mx-3 mt-1 flex items-center justify-center bg-white text-black rounded-full py-2.5 text-sm font-semibold font-body transition-colors hover:bg-white/90">
                      Crear cuenta
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
