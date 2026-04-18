import { useState, useEffect } from 'react';
import { Loader2, Plus, Pencil, Trash2, BookOpen, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import type { Book, BookForm } from '@/types/user';

const CATEGORIES = ['Ficción', 'No ficción', 'Ciencia ficción', 'Romance', 'Terror', 'Histórico', 'Infantil', 'Biografía', 'Otro'];

const EMPTY_FORM: BookForm = { title: '', author: '', price: 0, stock: 0, description: '', coverImage: '', category: '' };

const FieldInput = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-xs font-medium text-white/55 font-body mb-1.5">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      min={type === 'number' ? 0 : undefined}
      step={type === 'number' ? (label.toLowerCase().includes('precio') ? '0.01' : '1') : undefined}
      className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2.5 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors"
    />
  </div>
);

const AdminLibrosContent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [formSaving, setFormSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BookForm>(EMPTY_FORM);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoadingBooks(true);
    const { data } = await supabase.from('books').select('*').order('createdAt', { ascending: false });
    setBooks(data || []);
    setLoadingBooks(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const setField = (key: keyof BookForm) => (v: string) =>
    setForm(f => ({ ...f, [key]: key === 'price' || key === 'stock' ? Number(v) : v }));

  const validate = (): string | null => {
    if (!form.title.trim()) return 'El título es requerido.';
    if (!form.author.trim()) return 'El autor es requerido.';
    if (form.price <= 0) return 'El precio debe ser mayor a 0.';
    if (form.stock < 0) return 'El stock no puede ser negativo.';
    if (form.coverImage && !/^https?:\/\/.+/.test(form.coverImage)) return 'La URL de portada no es válida.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const err = validate();
    if (err) return setError(err);

    setFormSaving(true);
    try {
      const payload: Partial<BookForm> = { ...form };
      if (!payload.description) delete payload.description;
      if (!payload.coverImage) delete payload.coverImage;
      if (!payload.category) delete payload.category;

      if (editingId) {
        const { error: err } = await supabase.from('books').update(payload).eq('id', editingId);
        if (err) throw err;
        setSuccess('Libro actualizado correctamente.');
      } else {
        const { error: err } = await supabase.from('books').insert(payload);
        if (err) throw err;
        setSuccess('Libro agregado correctamente.');
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
      await fetchBooks();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFormSaving(false);
      setTimeout(() => setSuccess(''), 3500);
    }
  };

  const handleEdit = (book: Book) => {
    setForm({
      title: book.title,
      author: book.author,
      price: book.price,
      stock: book.stock,
      description: book.description || '',
      coverImage: book.coverImage || '',
      category: book.category || '',
    });
    setEditingId(book.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error: err } = await supabase.from('books').delete().eq('id', id);
    if (!err) await fetchBooks();
    setDeletingId(null);
    setShowConfirm(null);
  };

  const cancelEdit = () => { setForm(EMPTY_FORM); setEditingId(null); setError(''); };

  return (
    <div className="min-h-screen bg-black px-5 py-10 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        {/* Encabezado */}
        <div>
          <h1 className="font-heading italic text-white text-3xl">Administrar Libros</h1>
          <p className="text-white/40 text-sm font-body mt-1">Panel de administración — MICH Bookstore</p>
        </div>

        {/* ──── Formulario ──── */}
        <div className="liquid-glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading italic text-white text-xl flex items-center gap-2">
              {editingId ? <><Pencil size={18} /> Editar libro</> : <><Plus size={18} /> Agregar libro</>}
            </h2>
            {editingId && (
              <button onClick={cancelEdit} className="p-1.5 text-white/40 hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput label="Título" value={form.title} onChange={setField('title')} placeholder="El Principito" required />
              <FieldInput label="Autor" value={form.author} onChange={setField('author')} placeholder="Antoine de Saint-Exupéry" required />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-xs font-medium text-white/55 font-body mb-1.5">Categoría</label>
              <select
                value={form.category}
                onChange={e => setField('category')(e.target.value)}
                className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2.5 text-white text-sm font-body focus:outline-none focus:border-white/35 transition-colors appearance-none"
              >
                <option value="" className="bg-black">Seleccionar categoría</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c} className="bg-black">{c}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FieldInput label="Precio (S/)" value={form.price} onChange={setField('price')} type="number" placeholder="29.90" required />
              <FieldInput label="Stock" value={form.stock} onChange={setField('stock')} type="number" placeholder="10" required />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-xs font-medium text-white/55 font-body mb-1.5">Descripción</label>
              <textarea
                value={form.description}
                onChange={e => setField('description')(e.target.value)}
                placeholder="Descripción del libro..."
                rows={3}
                className="w-full bg-white/[0.07] border border-white/[0.12] rounded-2xl px-4 py-2.5 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors resize-none"
              />
            </div>

            <FieldInput label="URL de portada" value={form.coverImage || ''} onChange={setField('coverImage')} placeholder="https://..." />

            {error && (
              <p className="text-red-400 text-sm font-body text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 text-sm font-body text-center bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                {success}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={formSaving}
                className="flex-1 bg-white text-black rounded-full py-3 font-semibold font-body text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {formSaving ? <><Loader2 size={15} className="animate-spin" /> Guardando...</> : (editingId ? 'Actualizar libro' : 'Agregar libro')}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit}
                  className="px-6 border border-white/20 text-white/60 hover:text-white rounded-full font-body text-sm transition-colors">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ──── Tabla de libros ──── */}
        <div className="liquid-glass rounded-2xl p-6">
          <h2 className="font-heading italic text-white text-xl mb-5 flex items-center gap-2">
            <BookOpen size={18} />
            Libros registrados
            {!loadingBooks && <span className="text-white/35 text-sm font-body font-normal">({books.length})</span>}
          </h2>

          {loadingBooks ? (
            <div className="flex justify-center py-10"><Loader2 size={22} className="animate-spin text-white/40" /></div>
          ) : books.length === 0 ? (
            <p className="text-white/35 text-sm font-body text-center py-10">No hay libros registrados aún.</p>
          ) : (
            <div className="space-y-2">
              {/* Cabecera */}
              <div className="hidden sm:grid grid-cols-[2fr_1.5fr_0.8fr_0.8fr_1fr_auto] gap-3 px-3 pb-2 border-b border-white/10">
                {['Título', 'Autor', 'Precio', 'Stock', 'Categoría', ''].map(h => (
                  <span key={h} className="text-xs text-white/40 font-body font-medium uppercase tracking-wide">{h}</span>
                ))}
              </div>

              {books.map(book => (
                <div
                  key={book.id}
                  className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1.5fr_0.8fr_0.8fr_1fr_auto] gap-3 items-center bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-xl px-3 py-3 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-white/85 text-sm font-body font-medium truncate">{book.title}</p>
                    <p className="text-white/40 text-xs font-body sm:hidden">{book.author} · S/{Number(book.price).toFixed(2)}</p>
                  </div>
                  <p className="text-white/55 text-sm font-body hidden sm:block truncate">{book.author}</p>
                  <p className="text-white/70 text-sm font-body hidden sm:block">S/ {Number(book.price).toFixed(2)}</p>
                  <p className="text-white/70 text-sm font-body hidden sm:block">{book.stock}</p>
                  <p className="text-white/45 text-xs font-body hidden sm:block truncate">{book.category || '—'}</p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleEdit(book)} className="p-1.5 text-white/35 hover:text-white transition-colors" title="Editar">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setShowConfirm(book.id)} className="p-1.5 text-white/35 hover:text-red-400 transition-colors" title="Eliminar">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5" onClick={() => setShowConfirm(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="liquid-glass rounded-2xl p-6 w-full max-w-sm relative z-10" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading italic text-white text-xl mb-2">¿Eliminar libro?</h3>
            <p className="text-white/50 text-sm font-body mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(showConfirm)}
                disabled={deletingId === showConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-full py-2.5 font-semibold font-body text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {deletingId === showConfirm ? <Loader2 size={14} className="animate-spin" /> : null}
                Eliminar
              </button>
              <button onClick={() => setShowConfirm(null)}
                className="flex-1 border border-white/20 text-white/60 hover:text-white rounded-full py-2.5 font-body text-sm transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminLibros = () => (
  <ProtectedAdminRoute>
    <AdminLibrosContent />
  </ProtectedAdminRoute>
);

export default AdminLibros;
