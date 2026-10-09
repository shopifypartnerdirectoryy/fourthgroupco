CREATE TYPE public.app_role AS ENUM ('admin','member');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- Owner email is granted admin automatically once confirmed
CREATE OR REPLACE FUNCTION public.grant_owner_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'fourthgroupco@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_owner_admin AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_owner_admin();
INSERT INTO public.user_roles(user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email)='fourthgroupco@gmail.com' AND email_confirmed_at IS NOT NULL
ON CONFLICT DO NOTHING;

-- Author spotlight submissions
CREATE TABLE public.spotlight_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (length(trim(full_name)) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  project_title text NOT NULL CHECK (length(trim(project_title)) BETWEEN 1 AND 200),
  genre text NOT NULL CHECK (length(genre) BETWEEN 1 AND 60),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_review','contacted','scheduled','published','declined')),
  admin_notes text CHECK (admin_notes IS NULL OR length(admin_notes) <= 4000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX spotlight_dedupe ON public.spotlight_submissions (lower(email), lower(project_title));
GRANT INSERT ON public.spotlight_submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spotlight_submissions TO authenticated;
GRANT ALL ON public.spotlight_submissions TO service_role;
ALTER TABLE public.spotlight_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits a new spotlight" ON public.spotlight_submissions FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND admin_notes IS NULL);
CREATE POLICY "Admins read spotlights" ON public.spotlight_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update spotlights" ON public.spotlight_submissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete spotlights" ON public.spotlight_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Testimonials (only approved shown publicly)
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_name text NOT NULL CHECK (length(trim(member_name)) BETWEEN 2 AND 120),
  specialty text CHECK (specialty IS NULL OR length(specialty) <= 120),
  quote text NOT NULL CHECK (length(trim(quote)) BETWEEN 10 AND 1500),
  portrait_url text CHECK (portrait_url IS NULL OR portrait_url ~* '^https://'),
  profile_url text CHECK (profile_url IS NULL OR profile_url ~* '^https://'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published testimonials are public" ON public.testimonials FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Member desk: saved opportunities & submission tracker
CREATE TABLE public.desk_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  opportunity_key text NOT NULL CHECK (length(opportunity_key) BETWEEN 1 AND 300),
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 300),
  category text NOT NULL CHECK (length(category) BETWEEN 1 AND 60),
  url text CHECK (url IS NULL OR length(url) <= 1000),
  official_deadline text CHECK (official_deadline IS NULL OR length(official_deadline) <= 120),
  target_date date,
  submitted_on date,
  notes text CHECK (notes IS NULL OR length(notes) <= 4000),
  response_notes text CHECK (response_notes IS NULL OR length(response_notes) <= 4000),
  status text NOT NULL DEFAULT 'saved' CHECK (status IN ('saved','preparing','submitted','awaiting','accepted','rejected','withdrawn')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, opportunity_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.desk_items TO authenticated;
GRANT ALL ON public.desk_items TO service_role;
ALTER TABLE public.desk_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage desk" ON public.desk_items FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Memberships (manual renewal, admin-verified payment)
CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending_payment' CHECK (status IN ('pending_payment','active','expired','cancelled','refunded')),
  started_on date,
  expires_on date,
  cancel_requested_at timestamptz,
  terms_version text NOT NULL DEFAULT '2026-10-draft',
  admin_notes text CHECK (admin_notes IS NULL OR length(admin_notes) <= 4000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read memberships" ON public.memberships FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Owners request membership" ON public.memberships FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending_payment' AND started_on IS NULL AND expires_on IS NULL AND admin_notes IS NULL);
CREATE POLICY "Admins update memberships" ON public.memberships FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.request_membership_cancellation(_id uuid)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.memberships SET cancel_requested_at = now(), updated_at = now()
  WHERE id = _id AND user_id = auth.uid() AND cancel_requested_at IS NULL;
$$;
REVOKE EXECUTE ON FUNCTION public.request_membership_cancellation(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.request_membership_cancellation(uuid) TO authenticated;

-- Refund requests
CREATE TABLE public.refund_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  membership_id uuid REFERENCES public.memberships(id) ON DELETE SET NULL,
  reason text NOT NULL CHECK (length(trim(reason)) BETWEEN 10 AND 2000),
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted','in_review','approved','declined')),
  decision_notes text CHECK (decision_notes IS NULL OR length(decision_notes) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.refund_requests TO authenticated;
GRANT ALL ON public.refund_requests TO service_role;
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read refunds" ON public.refund_requests FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Owners request refunds" ON public.refund_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'submitted' AND decision_notes IS NULL);
CREATE POLICY "Admins decide refunds" ON public.refund_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Events RSVP (event ids from local editorial data)
CREATE TABLE public.event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  event_key text NOT NULL CHECK (length(event_key) BETWEEN 1 AND 200),
  event_title text NOT NULL CHECK (length(event_title) BETWEEN 1 AND 300),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, event_key)
);
GRANT SELECT, INSERT, DELETE ON public.event_rsvps TO authenticated;
GRANT ALL ON public.event_rsvps TO service_role;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage rsvps" ON public.event_rsvps FOR ALL TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() = user_id);

-- Admins can review and moderate pitches
CREATE POLICY "Admins read all pitches" ON public.pitches FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins read claims" ON public.article_claims FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT ON public.article_claims TO authenticated;