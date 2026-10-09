ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'standard';
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS referral_code text;
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS payment_reference text;
ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS contact_name text;
ALTER TABLE public.memberships ADD CONSTRAINT memberships_plan_chk CHECK (plan IN ('standard','pro'));

CREATE TABLE public.team_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text NOT NULL CHECK (length(trim(full_name)) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (length(email) <= 255),
  phone text CHECK (phone IS NULL OR length(phone) <= 40),
  country text CHECK (country IS NULL OR length(country) <= 80),
  role_interest text NOT NULL CHECK (length(role_interest) <= 120),
  motivation text NOT NULL CHECK (length(motivation) BETWEEN 10 AND 2000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','suspended')),
  referral_code text UNIQUE CHECK (referral_code IS NULL OR referral_code ~ '^[0-9]{4}$'),
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.team_applications TO authenticated;
GRANT ALL ON public.team_applications TO service_role;
ALTER TABLE public.team_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Applicants submit" ON public.team_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending' AND referral_code IS NULL AND admin_notes IS NULL);
CREATE POLICY "Applicants and admins read" ON public.team_applications FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.decide_team_application(_id uuid, _status text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE c text; tries int := 0;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Not allowed'; END IF;
  IF _status NOT IN ('approved','rejected','suspended','pending') THEN RAISE EXCEPTION 'Bad status'; END IF;
  SELECT referral_code INTO c FROM public.team_applications WHERE id = _id;
  IF _status = 'approved' AND c IS NULL THEN
    LOOP
      c := lpad((floor(random()*10000))::int::text, 4, '0');
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.team_applications WHERE referral_code = c);
      tries := tries + 1; IF tries > 200 THEN RAISE EXCEPTION 'No codes left'; END IF;
    END LOOP;
  END IF;
  UPDATE public.team_applications SET status = _status, referral_code = c, updated_at = now() WHERE id = _id;
  RETURN c;
END $$;

CREATE OR REPLACE FUNCTION public.validate_referral_code(_code text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT _code ~ '^[0-9]{4}$' AND EXISTS (SELECT 1 FROM public.team_applications WHERE referral_code = _code AND status = 'approved')
$$;

CREATE OR REPLACE FUNCTION public.check_membership_referral()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.referral_code IS NOT NULL AND NEW.referral_code <> '' AND NOT public.validate_referral_code(NEW.referral_code) THEN
    RAISE EXCEPTION 'Invalid referral code';
  END IF;
  IF NEW.referral_code = '' THEN NEW.referral_code := NULL; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER membership_referral_check BEFORE INSERT ON public.memberships FOR EACH ROW EXECUTE FUNCTION public.check_membership_referral();

DROP POLICY "Owners request membership" ON public.memberships;
CREATE POLICY "Owners request membership" ON public.memberships FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending_payment' AND started_on IS NULL AND expires_on IS NULL AND admin_notes IS NULL AND payment_reference IS NULL);

CREATE OR REPLACE FUNCTION public.has_member_access(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_uid,'admin') OR public.has_role(_uid,'moderator') OR EXISTS (
    SELECT 1 FROM public.memberships WHERE user_id = _uid AND status = 'active' AND expires_on >= CURRENT_DATE)
$$;
CREATE OR REPLACE FUNCTION public.has_pro(_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.memberships WHERE user_id = _uid AND plan = 'pro' AND status = 'active' AND expires_on >= CURRENT_DATE)
$$;

CREATE OR REPLACE FUNCTION public.admin_set_role(_email text, _role app_role, _grant boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth AS $$
DECLARE u uuid;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Not allowed'; END IF;
  SELECT id INTO u FROM auth.users WHERE lower(email) = lower(trim(_email));
  IF u IS NULL THEN RAISE EXCEPTION 'No account with that email'; END IF;
  IF _grant THEN INSERT INTO public.user_roles(user_id, role) VALUES (u, _role) ON CONFLICT DO NOTHING;
  ELSE DELETE FROM public.user_roles WHERE user_id = u AND role = _role AND u <> auth.uid(); END IF;
END $$;

CREATE TABLE public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL,
  author_name text NOT NULL CHECK (length(trim(author_name)) BETWEEN 1 AND 80),
  category text NOT NULL CHECK (category IN ('introductions','craft','publishing','marketing','screen','pro','announcements')),
  title text NOT NULL CHECK (length(trim(title)) BETWEEN 3 AND 160),
  body text NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 10000),
  pinned boolean NOT NULL DEFAULT false,
  hidden boolean NOT NULL DEFAULT false,
  reply_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX community_posts_cat_idx ON public.community_posts (category, pinned DESC, created_at DESC) WHERE NOT hidden;
CREATE INDEX community_posts_recent_idx ON public.community_posts (pinned DESC, created_at DESC) WHERE NOT hidden;
CREATE INDEX community_posts_author_idx ON public.community_posts (author_id);
CREATE TABLE public.community_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL,
  author_name text NOT NULL CHECK (length(trim(author_name)) BETWEEN 1 AND 80),
  body text NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 5000),
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX community_replies_post_idx ON public.community_replies (post_id, created_at);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_posts, public.community_replies TO authenticated;
GRANT ALL ON public.community_posts, public.community_replies TO service_role;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_staff(_uid uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_uid,'admin') OR public.has_role(_uid,'moderator') $$;

CREATE POLICY "Members read posts" ON public.community_posts FOR SELECT TO authenticated
  USING (public.has_member_access(auth.uid()) AND (NOT hidden OR public.is_staff(auth.uid()) OR author_id = auth.uid())
    AND (category <> 'pro' OR public.has_pro(auth.uid()) OR public.is_staff(auth.uid())));
CREATE POLICY "Members create posts" ON public.community_posts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id AND public.has_member_access(auth.uid()) AND hidden = false AND reply_count = 0
    AND (pinned = false OR public.is_staff(auth.uid()))
    AND (category <> 'announcements' OR public.is_staff(auth.uid()))
    AND (category <> 'pro' OR public.has_pro(auth.uid()) OR public.is_staff(auth.uid())));
CREATE POLICY "Staff moderate posts" ON public.community_posts FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Authors or staff delete posts" ON public.community_posts FOR DELETE TO authenticated
  USING (auth.uid() = author_id OR public.is_staff(auth.uid()));

CREATE POLICY "Members read replies" ON public.community_replies FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.community_posts p WHERE p.id = post_id) AND (NOT hidden OR public.is_staff(auth.uid()) OR author_id = auth.uid()));
CREATE POLICY "Members reply" ON public.community_replies FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id AND hidden = false AND public.has_member_access(auth.uid())
    AND EXISTS (SELECT 1 FROM public.community_posts p WHERE p.id = post_id AND NOT p.hidden));
CREATE POLICY "Staff moderate replies" ON public.community_replies FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Authors or staff delete replies" ON public.community_replies FOR DELETE TO authenticated
  USING (auth.uid() = author_id OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.bump_reply_count() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN UPDATE public.community_posts SET reply_count = reply_count + 1 WHERE id = NEW.post_id;
  ELSE UPDATE public.community_posts SET reply_count = greatest(reply_count - 1, 0) WHERE id = OLD.post_id; END IF;
  RETURN NULL;
END $$;
CREATE TRIGGER community_reply_count AFTER INSERT OR DELETE ON public.community_replies FOR EACH ROW EXECUTE FUNCTION public.bump_reply_count();

CREATE OR REPLACE FUNCTION public.post_rate_limit() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF (SELECT count(*) FROM public.community_posts WHERE author_id = NEW.author_id AND created_at > now() - interval '10 minutes') >= 5 THEN
    RAISE EXCEPTION 'You are posting too quickly. Please wait a few minutes.';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER community_post_rate BEFORE INSERT ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.post_rate_limit();