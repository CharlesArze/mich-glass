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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-10"
        >
          <img
            src="/video/50D84486-C5FD-4880-B7A6-5C3508EA7D9B_1_201_a.jpeg"
            alt="Libro de cristal"
            className="h-64 w-auto object-contain drop-shadow-2xl"
          />
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

        {/* Sombra de transición */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black/40 pointer-events-none z-20" />
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
