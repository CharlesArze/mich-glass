-- ============================================================
--  MICH Bookstore — Schema completo + RLS
--  Pegar en: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ─── EXTENSIONES ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── TABLA: users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         VARCHAR NOT NULL UNIQUE,
  "firstName"   VARCHAR NOT NULL DEFAULT '',
  "lastName"    VARCHAR NOT NULL DEFAULT '',
  "phoneNumber" VARCHAR,
  address       TEXT,
  avatar        VARCHAR,
  role          VARCHAR NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-actualizar updatedAt
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── TABLA: addresses ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.addresses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId"    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  street      VARCHAR NOT NULL,
  city        VARCHAR NOT NULL,
  state       VARCHAR NOT NULL,
  "zipCode"   VARCHAR NOT NULL,
  country     VARCHAR NOT NULL,
  "isDefault" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── TABLA: orders ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId"      UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  "orderNumber" VARCHAR NOT NULL UNIQUE,
  "totalAmount" DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status        VARCHAR NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── TABLA: books ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.books (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         VARCHAR NOT NULL,
  author        VARCHAR NOT NULL,
  price         DECIMAL(10, 2) NOT NULL DEFAULT 0,
  "coverImage"  VARCHAR,
  description   TEXT,
  category      VARCHAR,
  stock         INTEGER NOT NULL DEFAULT 0,
  rating        DECIMAL(3, 2) NOT NULL DEFAULT 0,
  "ratingCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- ── users ────────────────────────────────────────────────────
-- Cada usuario solo lee/edita su propio perfil
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Admins pueden leer todos los usuarios
CREATE POLICY "users_admin_select" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- ── addresses ────────────────────────────────────────────────
CREATE POLICY "addresses_owner" ON public.addresses
  FOR ALL USING ("userId" = auth.uid())
  WITH CHECK ("userId" = auth.uid());

-- ── orders ───────────────────────────────────────────────────
CREATE POLICY "orders_owner" ON public.orders
  FOR SELECT USING ("userId" = auth.uid());

CREATE POLICY "orders_admin" ON public.orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- ── books ────────────────────────────────────────────────────
-- Todos los usuarios autenticados pueden leer libros
CREATE POLICY "books_read_all" ON public.books
  FOR SELECT USING (auth.role() = 'authenticated');

-- Solo admins pueden escribir/editar/eliminar libros
CREATE POLICY "books_admin_write" ON public.books
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- ============================================================
--  INSTRUCCIONES OAUTH EN SUPABASE
-- ============================================================
/*
══════════════════════════════════════════════════════════════
 GOOGLE OAUTH
══════════════════════════════════════════════════════════════
1. Ve a: console.cloud.google.com
2. Crea un proyecto → APIs & Services → Credentials → Create OAuth 2.0 Client
3. Tipo: Web Application
4. Authorized redirect URIs:
   https://<tu-proyecto>.supabase.co/auth/v1/callback
5. Copia Client ID y Client Secret
6. En Supabase Dashboard → Authentication → Providers → Google
   - Activa Google, pega Client ID y Client Secret
   - Guarda

══════════════════════════════════════════════════════════════
 APPLE OAUTH
══════════════════════════════════════════════════════════════
1. Ve a: developer.apple.com → Certificates, IDs & Profiles
2. Crea un App ID con "Sign In with Apple"
3. Crea un Services ID (tipo Web):
   - Return URLs: https://<tu-proyecto>.supabase.co/auth/v1/callback
4. Genera una Key con "Sign In with Apple"
5. En Supabase → Authentication → Providers → Apple:
   - Service ID (Client ID), Team ID, Key ID, Private Key
   - Guarda

══════════════════════════════════════════════════════════════
 FACEBOOK OAUTH
══════════════════════════════════════════════════════════════
1. Ve a: developers.facebook.com → My Apps → Create App
2. Agrega producto "Facebook Login"
3. Valid OAuth Redirect URIs:
   https://<tu-proyecto>.supabase.co/auth/v1/callback
4. Copia App ID y App Secret
5. En Supabase → Authentication → Providers → Facebook:
   - Pega App ID y App Secret → Guarda

══════════════════════════════════════════════════════════════
 CONFIGURAR REDIRECT URL EN SUPABASE
══════════════════════════════════════════════════════════════
En Supabase → Authentication → URL Configuration:
  Site URL: https://tu-dominio.com  (o http://localhost:8080 en dev)
  Redirect URLs: agregar http://localhost:8080/perfil
                          https://tu-dominio.com/perfil
*/
