CREATE TABLE public.pitches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL CHECK (length(trim(title)) BETWEEN 1 AND 150),
  logline text NOT NULL CHECK (length(trim(logline)) BETWEEN 1 AND 400),
  genre text NOT NULL CHECK (length(trim(genre)) BETWEEN 1 AND 80),
  format text NOT NULL DEFAULT 'Feature film' CHECK (length(format) <= 80),
  synopsis text CHECK (synopsis IS NULL OR length(synopsis) <= 5000),
  rights text CHECK (rights IS NULL OR length(rights) <= 500),
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pitches TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pitches TO authenticated;
GRANT ALL ON public.pitches TO service_role;
ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published pitches are public" ON public.pitches FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Owners read own pitches" ON public.pitches FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners create pitches" ON public.pitches FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update pitches" ON public.pitches FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners delete pitches" ON public.pitches FOR DELETE TO authenticated USING (auth.uid() = user_id);