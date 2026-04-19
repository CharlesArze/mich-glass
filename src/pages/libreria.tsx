import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { useBooks, type SearchField, type SortOption } from '@/hooks/useBooks';

const CATEGORIES = [
  'Ficción', 'No ficción', 'Ciencia ficción', 'Romance',
  'Terror', 'Histórico', 'Infantil', 'Biografía', 'Otro',
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest',    label: 'Más recientes' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'rating',    label: 'Mejor calificados' },
];

const NUM_PAGES = 5;
const FLIP_DURATION = 6; // segundos por ciclo completo

const BookFlipAnimation = () => (
  <>
    <style>{`
      @keyframes bookFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-14px); }
      }
      @keyframes pageFlip {
        0%, 14%   { transform: rotateY(0deg);    opacity: 1; }
        48%        { transform: rotateY(-150deg); opacity: 1; }
        82%        { transform: rotateY(-180deg); opacity: 1; }
        83%        { transform: rotateY(-180deg); opacity: 0; }
        84%, 99%   { transform: rotateY(0deg);    opacity: 0; }
        100%       { transform: rotateY(0deg);    opacity: 1; }
      }
    `}</style>

    <div style={{ animation: 'bookFloat 5s ease-in-out infinite', display: 'inline-block' }}>
      <div style={{ perspective: '700px', perspectiveOrigin: '50% 40%' }}>
        <div style={{
          width: 260,
          height: 190,
          position: 'relative',
          transform: 'rotateX(6deg)',
          transformStyle: 'preserve-3d',
        }}>

          {/* Página izquierda (leídas) */}
          <div style={{
            position: 'absolute', left: 0, width: 128, height: 190,
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.13)',
            borderRight: 'none',
            borderRadius: '6px 0 0 6px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), -6px 12px 32px rgba(0,0,0,0.35)',
          }}>
            {[22,38,54,70,86,102,118,134,150].map(t => (
              <div key={t} style={{
                position: 'absolute', left: 14, right: 18, top: t,
                height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1,
              }} />
            ))}
          </div>

          {/* Lomo */}
          <div style={{
            position: 'absolute', left: 126, width: 8, height: 190,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
            zIndex: 20,
          }} />

          {/* Página derecha (por leer) */}
          <div style={{
            position: 'absolute', right: 0, width: 126, height: 190,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderLeft: 'none',
            borderRadius: '0 6px 6px 0',
            boxShadow: '6px 12px 32px rgba(0,0,0,0.25)',
          }}>
            {[22,38,54,70,86,102,118,134,150].map(t => (
              <div key={t} style={{
                position: 'absolute', left: 18, right: 14, top: t,
                height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1,
              }} />
            ))}
          </div>

          {/* Páginas que se voltean */}
          {Array.from({ length: NUM_PAGES }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 134,
                width: 120,
                height: 190,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                animation: `pageFlip ${FLIP_DURATION}s ease-in-out infinite`,
                animationDelay: `${i * (FLIP_DURATION / NUM_PAGES)}s`,
                zIndex: NUM_PAGES - i + 5,
              }}
            >
              {/* Frente */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'rgba(255,255,255,0.09)',
                border: '1px solid rgba(255,255,255,0.11)',
                borderLeft: 'none',
                borderRadius: '0 4px 4px 0',
              }}>
                {[22,38,54,70,86,102,118,134,150].map(t => (
                  <div key={t} style={{
                    position: 'absolute', left: 14, right: 12, top: t,
                    height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 1,
                  }} />
                ))}
              </div>
              {/* Dorso */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '0 4px 4px 0',
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

const BookCardSkeleton = () => (
  <div className="flex flex-col animate-pulse">
    <div className="aspect-[2/3] rounded-xl bg-white/5" />
    <div className="mt-2.5 space-y-1.5 px-0.5">
      <div className="h-3 bg-white/8 rounded-full w-4/5" />
      <div className="h-2.5 bg-white/5 rounded-full w-1/2" />
      <div className="h-2.5 bg-white/8 rounded-full w-1/4" />
    </div>
  </div>
);

const Libreria = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState<SearchField>('title');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Debounce de 300ms para la búsqueda
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { books, loading, error } = useBooks({ search, searchField, category, sort });

  const clearSearch = () => { setSearchInput(''); setSearch(''); };
  const clearAll = () => { clearSearch(); setCategory(''); };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-24 pb-16 px-6 flex flex-col items-center justify-center min-h-[52vh] overflow-hidden">
        <div className="glow-spot w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Animación libro con páginas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-10"
        >
          <BookFlipAnimation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-10 text-center"
        >
          <h1 className="glow-heading text-4xl md:text-6xl lg:text-7xl font-heading italic tracking-tight leading-[0.9]">
            Nuestra librería.
          </h1>
          <p className="mt-5 text-white/50 font-body font-light text-base md:text-lg max-w-sm mx-auto">
            Cada libro que buscas está aquí. Nuevos y usados, enviados a todo el Perú.
          </p>
        </motion.div>
      </section>

      <main className="px-6 pb-24 max-w-7xl mx-auto">

        {/* Buscador estilo Raycast */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="liquid-glass-strong rounded-2xl border border-white/10 flex items-center px-3 py-2 gap-2">
            {/* Tabs de campo de búsqueda */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setSearchField('title')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
                  searchField === 'title'
                    ? 'bg-white/15 text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                Por título
              </button>
              <button
                onClick={() => setSearchField('author')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-body font-medium transition-colors ${
                  searchField === 'author'
                    ? 'bg-white/15 text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                Por autor
              </button>
            </div>

            <div className="w-px h-5 bg-white/10 shrink-0" />

            <Search size={15} className="text-white/30 shrink-0" />

            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder={searchField === 'title' ? 'Buscar por título...' : 'Buscar por autor...'}
              className="flex-1 bg-transparent text-sm font-body text-white placeholder:text-white/25 focus:outline-none"
            />

            {searchInput && (
              <button onClick={clearSearch} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filtros desplegables + orden */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between gap-3">
            {/* Botón desplegable de categorías */}
            <button
              onClick={() => setFiltersOpen(v => !v)}
              className="flex items-center gap-2 liquid-glass rounded-full px-4 py-2 text-xs font-body font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              <SlidersHorizontal size={13} />
              {category ? `Categoría: ${category}` : 'Filtrar por categoría'}
              {category && (
                <span
                  onClick={e => { e.stopPropagation(); setCategory(''); }}
                  className="ml-1 text-white/40 hover:text-white/80"
                >
                  <X size={11} />
                </span>
              )}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Ordenamiento */}
            <div className="relative shrink-0">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="liquid-glass rounded-full pl-4 pr-4 py-2 text-xs font-body text-white/70 focus:outline-none appearance-none cursor-pointer bg-transparent"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-black text-white">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Panel de categorías desplegable */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-1.5 pt-4">
                  <button
                    onClick={() => { setCategory(''); setFiltersOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                      category === '' ? 'bg-white text-black' : 'liquid-glass text-white/55 hover:text-white/85'
                    }`}
                  >
                    Todos
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat === category ? '' : cat); setFiltersOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                        category === cat ? 'bg-white text-black' : 'liquid-glass text-white/55 hover:text-white/85'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contador */}
        {!loading && !error && (
          <p className="text-white/25 text-xs font-body mb-6">
            {books.length === 0
              ? 'Sin resultados'
              : `${books.length} ${books.length === 1 ? 'libro encontrado' : 'libros encontrados'}`}
          </p>
        )}

        {/* Estado error */}
        {error && (
          <div className="text-center py-24">
            <p className="text-white/40 font-body text-sm">Hubo un error al cargar los libros.</p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {Array.from({ length: 10 }).map((_, i) => <BookCardSkeleton key={i} />)}
          </div>
        ) : books.length === 0 && !error ? (
          <div className="text-center py-32">
            <p className="glow-heading text-4xl font-heading italic mb-4">Sin libros.</p>
            <p className="text-white/40 font-body text-sm mb-6">
              Prueba con otro término de búsqueda o categoría.
            </p>
            {(searchInput || category) && (
              <button
                onClick={clearAll}
                className="liquid-glass rounded-full px-5 py-2.5 text-sm font-body text-white/60 hover:text-white/90 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {books.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Libreria;
