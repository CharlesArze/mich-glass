import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUpWithEmail: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: string | null; needsConfirmation?: boolean }>;
  signUpWithGoogle: () => Promise<{ error?: string }>;
  signUpWithApple: () => Promise<{ error?: string }>;
  signUpWithFacebook: () => Promise<{ error?: string }>;
  signInWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithApple: () => Promise<{ error?: string }>;
  signInWithFacebook: () => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  getUser: () => User | null;
  updateUser: (firstName: string, lastName: string, phoneNumber?: string, avatar?: string) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const fetchProfile = async (userId: string): Promise<User | null> => {
  const { data } = await supabase.from('users').select('*').eq('id', userId).single();
  return data as User | null;
};

const createProfileFromOAuth = async (session: any) => {
  const meta = session.user.user_metadata || {};
  const fullName: string = meta.full_name || meta.name || '';
  const parts = fullName.trim().split(' ');
  const firstName = meta.given_name || parts[0] || '';
  const lastName = meta.family_name || parts.slice(1).join(' ') || '';

  await supabase.from('users').insert({
    id: session.user.id,
    email: session.user.email,
    firstName,
    lastName,
    role: 'user',
  });

  return fetchProfile(session.user.id);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        let profile = await fetchProfile(session.user.id);
        if (!profile) profile = await createProfileFromOAuth(session);
        setUser(profile);
      }
      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          let profile = await fetchProfile(session.user.id);
          // Solo crear perfil OAuth si realmente no existe y el proveedor es OAuth
          if (!profile && event === 'SIGNED_IN' && session.user.app_metadata?.provider !== 'email') {
            profile = await createProfileFromOAuth(session);
          }
          setUser(profile);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('onAuthStateChange error:', e);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUpWithEmail = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ error: string | null }> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { firstName, lastName } },
      });
      if (error) throw error;
      // Si no hay sesión, Supabase requiere confirmación de email
      if (!data.session) return { error: null, needsConfirmation: true };
      if (data.user) {
        const profile = await fetchProfile(data.user.id);
        setUser(profile);
      }
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Error al registrarse' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (
    email: string,
    password: string,
    _rememberMe = true
  ): Promise<{ error: string | null }> => {
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Tiempo de espera agotado. Intenta de nuevo.')), 10000)
      );
      const { error } = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        timeout,
      ]);
      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Credenciales incorrectas' };
    }
  };

  const oauthLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/` },
    });
    return { error: error?.message };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = async (
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    avatar?: string
  ): Promise<{ error: string | null }> => {
    if (!user) return { error: 'No autenticado' };
    try {
      const updates: Record<string, any> = {
        firstName,
        lastName,
        updatedAt: new Date().toISOString(),
      };
      if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;
      if (avatar !== undefined) updates.avatar = avatar;

      const { error } = await supabase.from('users').update(updates).eq('id', user.id);
      if (error) throw error;
      const updated = await fetchProfile(user.id);
      setUser(updated);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message };
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    signUpWithEmail,
    signUpWithGoogle: () => oauthLogin('google'),
    signUpWithApple: () => oauthLogin('apple'),
    signUpWithFacebook: () => oauthLogin('facebook'),
    signInWithEmail,
    signInWithGoogle: () => oauthLogin('google'),
    signInWithApple: () => oauthLogin('apple'),
    signInWithFacebook: () => oauthLogin('facebook'),
    logout,
    getUser: () => user,
    updateUser,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
