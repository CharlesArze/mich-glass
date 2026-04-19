import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Book } from '@/types/user';

interface BookCardProps {
  book: Book;
  index: number;
}

const BookCard = ({ book, index }: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      onClick={() => navigate(`/libreria/${book.id}`)}
      className="cursor-pointer group flex flex-col"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/10 text-5xl font-heading italic select-none">
              {book.title[0]}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <ArrowUpRight size={14} className="text-black" />
          </div>
        </div>
      </div>

      {/* Info mínima */}
      <div className="mt-2.5 px-0.5">
        <h3 className="text-white text-sm font-body font-medium truncate leading-snug">
          {book.title}
        </h3>
        <p className="text-white/45 text-xs font-body truncate mt-0.5">{book.author}</p>
        <p className="text-white/80 text-xs font-body font-semibold mt-1">
          S/ {book.price.toFixed(2)}
        </p>
      </div>
    </motion.article>
  );
};

export default BookCard;
