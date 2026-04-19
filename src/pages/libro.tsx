import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Package, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { useBook, useBooks } from '@/hooks/useBooks';

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={13}
          className={star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-white/10 text-white/15'}
        />
      ))}
    </div>
    <span className="text-white/40 text-xs font-body">{rating.toFixed(1)} ({count})</span>
  </div>
);

const DetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
      <div className="aspect-[2/3] rounded-2xl bg-white/5 max-w-sm mx-auto w-full" />
      <div className="space-y-4 pt-4">
        <div className="h-3 bg-white/5 rounded-full w-1/4" />
        <div className="h-8 bg-white/8 rounded-xl w-3/4" />
        <div className="h-6 bg-white/6 rounded-xl w-1/3" />
        <div className="h-px bg-white/10 my-6" />
        <div className="space-y-2">
          <div className="h-3 bg-white/5 rounded-full w-full" />
          <div className="h-3 bg-white/5 rounded-full w-5/6" />
          <div className="h-3 bg-white/5 rounded-full w-4/5" />
        </div>
      </div>
    </div>
  </div>
);

const Libro = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading, error } = useBook(id || '');
  const { books: related } = useBooks({
    category: book?.category || '',
    sort: 'rating',
    limit: 5,
    excludeId: id,
  });

  const whatsappUrl = book
    ? `https://wa.me/51903576755?text=${encodeURIComponent(`Hola, me interesa el libro "${book.title}" de ${book.author}. ¿Está disponible?`)}`
    : 'https://wa.me/51903576755';

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <main className="pt-28 pb-24 px-6 max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-body text-white/35 mb-10"
        >
          <Link to="/libreria" className="hover:text-white/60 transition-colors flex items-center gap-1.5">
            <ArrowLeft size={12} />
            Librería
          </Link>
          {book && (
            <>
              <span>/</span>
              <span className="text-white/55 truncate max-w-[200px]">{book.title}</span>
            </>
          )}
        </motion.div>

        {/* Error */}
        {error && (
          <div className="text-center py-32">
            <p className="text-white/40 font-body text-sm">No se encontró el libro.</p>
            <Link to="/libreria" className="mt-4 inline-block text-white/60 hover:text-white text-sm font-body underline">
              Volver a la librería
            </Link>
          </div>
        )}

        {/* Loading */}
        {loading && <DetailSkeleton />}

        {/* Contenido */}
        {!loading && !error && book && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Layout dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Columna izquierda — Portada */}
              <div className="liquid-glass rounded-2xl overflow-hidden aspect-[2/3] max-w-sm mx-auto w-full flex items-center justify-center">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white/10 text-8xl font-heading italic">
                    {book.title[0]}
                  </span>
                )}
              </div>

              {/* Columna derecha — Info */}
              <div className="flex flex-col gap-5 md:pt-2">

                {/* Categoría */}
                {book.category && (
                  <span className="text-xs font-body text-white/35 uppercase tracking-widest">
                    {book.category}
                  </span>
                )}

                {/* Título */}
                <h1 className="glow-heading text-3xl md:text-4xl lg:text-5xl font-heading italic tracking-tight leading-[0.95]">
                  {book.title}
                </h1>

                {/* Autor */}
                <p className="text-white/55 font-body text-base">{book.author}</p>

                {/* Precio */}
                <p className="text-white text-2xl font-body font-semibold">
                  S/ {book.price.toFixed(2)}
                </p>

                {/* Rating */}
                <StarRating rating={book.rating} count={book.ratingCount} />

                <div className="h-px bg-white/10" />

                {/* Descripción */}
                {book.description && (
                  <div>
                    <h2 className="text-xs font-body font-semibold text-white/50 uppercase tracking-widest mb-2">
                      Acerca del libro
                    </h2>
                    <p className="text-white/65 font-body font-light text-sm leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}

                {/* Detalles */}
                <div>
                  <h2 className="text-xs font-body font-semibold text-white/50 uppercase tracking-widest mb-3">
                    Detalles
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-body">
                      <Package size={13} className="text-white/30 shrink-0" />
                      <span className="text-white/45">Stock:</span>
                      <span className={`font-medium ${book.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {book.stock > 0 ? `${book.stock} disponibles` : 'Agotado'}
                      </span>
                    </div>
                    {book.category && (
                      <div className="flex items-center gap-2 text-sm font-body">
                        <span className="text-white/45">Categoría:</span>
                        <span className="text-white/70">{book.category}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {/* CTA WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-white text-black rounded-full px-6 py-3.5 text-sm font-body font-medium transition-colors hover:bg-white/90 w-full"
                >
                  <MessageCircle size={16} />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

            {/* Libros relacionados */}
            {related.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-heading italic text-white/80">
                    También te puede interesar
                  </h2>
                  <Link
                    to={`/libreria${book.category ? `?cat=${book.category}` : ''}`}
                    className="text-xs font-body text-white/35 hover:text-white/60 transition-colors"
                  >
                    Ver más →
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                  {related.slice(0, 4).map((rel, i) => (
                    <BookCard key={rel.id} book={rel} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Libro;
