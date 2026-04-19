import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Book } from '@/types/user';

export type SearchField = 'title' | 'author';
export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating';

export interface UseBooksOptions {
  search?: string;
  searchField?: SearchField;
  category?: string;
  sort?: SortOption;
  limit?: number;
  excludeId?: string;
}

export const useBooks = (options: UseBooksOptions = {}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { search = '', searchField = 'title', category = '', sort = 'newest', limit, excludeId } = options;

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('books').select('*');

      if (category) query = query.eq('category', category);

      if (excludeId) query = query.neq('id', excludeId);

      if (search.trim()) {
        const col = searchField === 'author' ? 'author' : 'title';
        query = query.ilike(col, `%${search.trim()}%`);
      }

      switch (sort) {
        case 'price_asc':  query = query.order('price', { ascending: true }); break;
        case 'price_desc': query = query.order('price', { ascending: false }); break;
        case 'rating':     query = query.order('rating', { ascending: false }); break;
        default:           query = query.order('createdAt', { ascending: false });
      }

      if (limit) query = query.limit(limit);

      const { data, error: err } = await query;
      if (err) throw err;
      setBooks((data as Book[]) || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar libros');
    } finally {
      setLoading(false);
    }
  }, [search, searchField, category, sort, limit, excludeId]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  return { books, loading, error };
};

export const useBook = (id: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setBook(data as Book);
        setLoading(false);
      });
  }, [id]);

  return { book, loading, error };
};
