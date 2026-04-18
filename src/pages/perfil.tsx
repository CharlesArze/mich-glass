import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, LogOut, ShoppingBag, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import ProtectedRoute from '@/components/ProtectedRoute';

/* ─── Subcomponentes de sección ─── */

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading italic text-white text-xl mb-5">{children}</h2>
);

const FieldInput = ({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
  placeholder = '',
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-white/55 font-body mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2.5 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    completed: 'bg-green-500/20 text-green-300 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  const label: Record<string, string> = {
    pending: 'Pendiente',
    completed: 'Completado',
    cancelled: 'Cancelado',
  };
  return (
    <span className={`text-xs font-body px-3 py-1 rounded-full border ${map[status] || 'bg-white/10 text-white/60 border-white/20'}`}>
      {label[status] || status}
    </span>
  );
};

/* ─── Página principal ─── */

const TABS = [
  { id: 'info', label: 'Información', icon: User },
  { id: 'orders', label: 'Compras', icon: ShoppingBag },
] as const;

type TabId = (typeof TABS)[number]['id'];

const PerfilContent = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const { orders, loading: ordersLoading, getOrders } = useOrders();

  const [activeTab, setActiveTab] = useState<TabId>('info');

  /* Info personal */
  const [info, setInfo] = useState({ firstName: '', lastName: '', phoneNumber: '' });
  const [infoSaving, setInfoSaving] = useState(false);
  const [infoMsg, setInfoMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
      });
      getOrders(user.id);
    }
  }, [user]);

  /* ── Guardar info ── */
  const handleSaveInfo = async () => {
    setInfoMsg(null);
    setInfoSaving(true);
    const { error } = await updateUser(info.firstName, info.lastName, info.phoneNumber);
    setInfoSaving(false);
    setInfoMsg(error ? { type: 'err', text: error } : { type: 'ok', text: 'Cambios guardados correctamente.' });
    setTimeout(() => setInfoMsg(null), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black px-5 py-10 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 liquid-glass rounded-full px-4 py-2 text-white/70 hover:text-white text-sm font-body transition-colors">
            <ArrowLeft size={15} />
            Regresar a inicio
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 liquid-glass rounded-full px-4 py-2 text-white/70 hover:text-white text-sm font-body transition-colors"
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 liquid-glass rounded-full p-1 mb-8 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 flex-1 justify-center px-4 py-2 rounded-full text-sm font-body transition-all whitespace-nowrap ${
                activeTab === id ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* ──────── Tab: Info personal ──────── */}
        {activeTab === 'info' && (
          <div className="liquid-glass rounded-2xl p-6">
            <SectionTitle>Información Personal</SectionTitle>
            <div className="space-y-4">
              <FieldInput label="Email" value={user.email} disabled />
              <div className="grid grid-cols-2 gap-3">
                <FieldInput label="Nombre" value={info.firstName} onChange={v => setInfo(f => ({ ...f, firstName: v }))} placeholder="Carlos" />
                <FieldInput label="Apellido" value={info.lastName} onChange={v => setInfo(f => ({ ...f, lastName: v }))} placeholder="García" />
              </div>
              <FieldInput label="Teléfono" value={info.phoneNumber} onChange={v => setInfo(f => ({ ...f, phoneNumber: v }))} type="tel" placeholder="+51 999 000 000" />

              {infoMsg && (
                <p className={`text-sm font-body text-center px-4 py-2.5 rounded-xl border ${
                  infoMsg.type === 'ok'
                    ? 'text-green-400 bg-green-500/10 border-green-500/20'
                    : 'text-red-400 bg-red-500/10 border-red-500/20'
                }`}>
                  {infoMsg.text}
                </p>
              )}

              <button
                onClick={handleSaveInfo}
                disabled={infoSaving}
                className="w-full bg-white text-black rounded-full py-3 font-semibold font-body text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {infoSaving ? <><Loader2 size={15} className="animate-spin" /> Guardando...</> : 'Guardar cambios'}
              </button>
            </div>
          </div>
        )}

        {/* ──────── Tab: Historial de compras ──────── */}
        {activeTab === 'orders' && (
          <div className="liquid-glass rounded-2xl p-6">
            <SectionTitle>Historial de Compras</SectionTitle>

            {ordersLoading ? (
              <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-white/40" /></div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={36} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/35 text-sm font-body">Aún no tienes compras</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Cabecera */}
                <div className="grid grid-cols-4 gap-2 px-2 pb-2 border-b border-white/10">
                  {['Orden', 'Fecha', 'Total', 'Estado'].map(h => (
                    <span key={h} className="text-xs text-white/40 font-body font-medium uppercase tracking-wide">{h}</span>
                  ))}
                </div>
                {orders.map(order => (
                  <div key={order.id} className="grid grid-cols-4 gap-2 items-center bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-xl px-3 py-3 transition-colors">
                    <span className="text-white/80 text-xs font-body font-medium truncate">#{order.orderNumber}</span>
                    <span className="text-white/45 text-xs font-body">
                      {new Date(order.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="text-white/80 text-xs font-body">S/ {Number(order.totalAmount).toFixed(2)}</span>
                    <StatusBadge status={order.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Perfil = () => (
  <ProtectedRoute>
    <PerfilContent />
  </ProtectedRoute>
);

export default Perfil;
