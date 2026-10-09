CREATE TABLE public.weekly_spotlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('book','creative')),
  title text NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 200),
  creator_name text NOT NULL CHECK (length(trim(creator_name)) BETWEEN 1 AND 160),
  specialty text CHECK (specialty IS NULL OR length(specialty) <= 160),
  description text NOT NULL CHECK (length(trim(description)) BETWEEN 10 AND 2000),
  image_url text CHECK (image_url IS NULL OR image_url ~* '^https://'),
  link_url text CHECK (link_url IS NULL OR link_url ~* '^https://'),
  week_start date NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.weekly_spotlights TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_spotlights TO authenticated;
GRANT ALL ON public.weekly_spotlights TO service_role;
ALTER TABLE public.weekly_spotlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published spotlights are public" ON public.weekly_spotlights FOR SELECT TO anon, authenticated USING ((status = 'published' AND week_start <= current_date) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage weekly spotlights" ON public.weekly_spotlights FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.critique_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  display_name text NOT NULL CHECK (length(trim(display_name)) BETWEEN 2 AND 80),
  role text NOT NULL CHECK (role IN ('writer','beta_reader','both')),
  genres text[] NOT NULL DEFAULT '{}' CHECK (cardinality(genres) <= 8),
  forms text[] NOT NULL DEFAULT '{}' CHECK (cardinality(forms) <= 6),
  experience text NOT NULL DEFAULT 'emerging' CHECK (experience IN ('emerging','developing','published')),
  bio text CHECK (bio IS NULL OR length(bio) <= 1000),
  looking_for text CHECK (looking_for IS NULL OR length(looking_for) <= 500),
  open_to_requests boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.critique_profiles TO authenticated;
GRANT ALL ON public.critique_profiles TO service_role;
ALTER TABLE public.critique_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members see open profiles" ON public.critique_profiles FOR SELECT TO authenticated USING (open_to_requests OR auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Owners manage critique profile" ON public.critique_profiles FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.critique_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  project_title text NOT NULL CHECK (length(trim(project_title)) BETWEEN 1 AND 200),
  message text NOT NULL CHECK (length(trim(message)) BETWEEN 10 AND 1500),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined','completed','withdrawn')),
  reported boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (requester_id <> recipient_id)
);
CREATE UNIQUE INDEX critique_one_open ON public.critique_requests (requester_id, recipient_id) WHERE status = 'pending';
GRANT SELECT, INSERT, UPDATE ON public.critique_requests TO authenticated;
GRANT ALL ON public.critique_requests TO service_role;
ALTER TABLE public.critique_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parties read critique requests" ON public.critique_requests FOR SELECT TO authenticated USING (auth.uid() IN (requester_id, recipient_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Members send critique requests" ON public.critique_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id AND status = 'pending' AND reported = false
  AND EXISTS (SELECT 1 FROM public.critique_profiles p WHERE p.user_id = recipient_id AND p.open_to_requests));
CREATE POLICY "Parties update critique requests" ON public.critique_requests FOR UPDATE TO authenticated USING (auth.uid() IN (requester_id, recipient_id) OR public.has_role(auth.uid(),'admin')) WITH CHECK (auth.uid() IN (requester_id, recipient_id) OR public.has_role(auth.uid(),'admin'));

-- Contact email is only revealed to the other party after acceptance
CREATE OR REPLACE FUNCTION public.critique_contact(_request_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth AS $$
  SELECT u.email::text FROM public.critique_requests r
  JOIN auth.users u ON u.id = CASE WHEN r.requester_id = auth.uid() THEN r.recipient_id ELSE r.requester_id END
  WHERE r.id = _request_id AND r.status IN ('accepted','completed') AND auth.uid() IN (r.requester_id, r.recipient_id)
$$;
REVOKE EXECUTE ON FUNCTION public.critique_contact(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.critique_contact(uuid) TO authenticated;

CREATE TABLE public.pitch_deck_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pitch_id uuid NOT NULL REFERENCES public.pitches(id) ON DELETE CASCADE,
  requester_id uuid NOT NULL,
  owner_id uuid NOT NULL,
  requester_name text NOT NULL CHECK (length(trim(requester_name)) BETWEEN 2 AND 120),
  company text CHECK (company IS NULL OR length(company) <= 160),
  message text NOT NULL CHECK (length(trim(message)) BETWEEN 10 AND 1500),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','declined')),
  owner_reply text CHECK (owner_reply IS NULL OR length(owner_reply) <= 1500),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX deck_one_open ON public.pitch_deck_requests (pitch_id, requester_id) WHERE status = 'pending';
GRANT SELECT, INSERT, UPDATE ON public.pitch_deck_requests TO authenticated;
GRANT ALL ON public.pitch_deck_requests TO service_role;
ALTER TABLE public.pitch_deck_requests ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_deck_request_owner()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE o uuid; pub boolean;
BEGIN
  SELECT user_id, published INTO o, pub FROM public.pitches WHERE id = NEW.pitch_id;
  IF o IS NULL OR NOT pub THEN RAISE EXCEPTION 'Pitch not available'; END IF;
  IF o = NEW.requester_id THEN RAISE EXCEPTION 'Cannot request your own pitch'; END IF;
  NEW.owner_id := o; NEW.status := 'pending'; NEW.owner_reply := NULL;
  RETURN NEW;
END $$;
CREATE TRIGGER deck_request_owner BEFORE INSERT ON public.pitch_deck_requests FOR EACH ROW EXECUTE FUNCTION public.set_deck_request_owner();

CREATE POLICY "Parties read deck requests" ON public.pitch_deck_requests FOR SELECT TO authenticated USING (auth.uid() IN (requester_id, owner_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Members request decks" ON public.pitch_deck_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Owners answer deck requests" ON public.pitch_deck_requests FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE OR REPLACE FUNCTION public.deck_request_contact(_request_id uuid)
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, auth AS $$
  SELECT u.email::text FROM public.pitch_deck_requests r
  JOIN auth.users u ON u.id = CASE WHEN r.requester_id = auth.uid() THEN r.owner_id ELSE r.requester_id END
  WHERE r.id = _request_id AND r.status = 'approved' AND auth.uid() IN (r.requester_id, r.owner_id)
$$;
REVOKE EXECUTE ON FUNCTION public.deck_request_contact(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.deck_request_contact(uuid) TO authenticated;