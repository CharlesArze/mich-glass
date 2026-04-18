import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.31.07 2.21.73 2.97.75.97-.25 1.89-.97 3.18-.88 1.23.08 2.22.59 2.84 1.5-2.69 1.56-1.98 4.73.53 5.69-.56 1.45-1.27 2.89-1.52 5.82zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const OAuthButton = ({
  onClick,
  icon,
  label,
  disabled,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="w-full flex items-center justify-center gap-3 bg-white/[0.07] hover:bg-white/[0.13] border border-white/[0.12] rounded-full py-3 text-white/85 font-body text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {icon}
    {label}
  </button>
);

const Registro = () => {
  const navigate = useNavigate();
  const { signUpWithEmail, signUpWithGoogle, signUpWithApple, signUpWithFacebook, loading } = useAuth();

  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Ingresa un email válido.');
    if (form.password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.');
    if (!form.firstName.trim()) return setError('El nombre es requerido.');
    if (!form.lastName.trim()) return setError('El apellido es requerido.');

    setSubmitting(true);
    const { error: err, needsConfirmation } = await signUpWithEmail(form.email, form.password, form.firstName, form.lastName);
    setSubmitting(false);
    if (err) return setError(err);
    if (needsConfirmation) return setError('✉️ Revisa tu email y confirma tu cuenta para continuar.');
    navigate('/perfil');
  };

  const handleOAuth = async (fn: () => Promise<{ error?: string }>) => {
    setError('');
    const { error: err } = await fn();
    if (err) setError(err);
  };

  const busy = submitting;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5 py-12 relative overflow-hidden">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="liquid-glass rounded-full px-4 py-1.5 hover:bg-white/[0.15] transition-colors">
            <span className="text-sm font-medium text-white font-body">MICH Bookstore</span>
          </Link>
        </div>

        <div className="liquid-glass rounded-2xl p-8">
          <h1 className="font-heading italic text-white text-[1.6rem] leading-tight text-center mb-1">
            Crear Cuenta en MitchBookstore
          </h1>
          <p className="text-white/45 text-sm font-body text-center mb-8">
            Únete y descubre nuevas historias
          </p>

          {/* OAuth */}
          <div className="space-y-3 mb-6">
            <OAuthButton onClick={() => handleOAuth(signUpWithGoogle)} icon={<GoogleIcon />} label="Registrar con Google" disabled={busy} />
            <OAuthButton onClick={() => handleOAuth(signUpWithApple)} icon={<AppleIcon />} label="Registrar con Apple" disabled={busy} />
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.12]" />
            <span className="text-white/35 text-xs font-body uppercase tracking-[0.2em]">O</span>
            <div className="flex-1 h-px bg-white/[0.12]" />
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/55 font-body mb-1.5">Nombre</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="Carlos"
                  className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2.5 text-white text-[16px] font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/55 font-body mb-1.5">Apellido</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={set('lastName')}
                  placeholder="García"
                  className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2.5 text-white text-[16px] font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/55 font-body mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="carlos@ejemplo.com"
                autoComplete="email"
                className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2.5 text-white text-[16px] font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/55 font-body mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  className="w-full bg-white/[0.07] border border-white/[0.12] rounded-full px-4 pr-11 py-2.5 text-white text-[16px] font-body placeholder:text-white/25 focus:outline-none focus:border-white/35 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-body text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-white text-black rounded-full py-3 font-semibold font-body text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {busy ? <><Loader2 size={15} className="animate-spin" /> Creando cuenta...</> : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-center text-white/35 text-sm font-body mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-white/70 hover:text-white transition-colors underline underline-offset-2">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
