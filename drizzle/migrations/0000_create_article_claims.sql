CREATE TABLE public.article_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 100),
  last_name text NOT NULL CHECK (char_length(last_name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  story text CHECK (story IS NULL OR char_length(story) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.article_claims TO anon, authenticated;
GRANT ALL ON public.article_claims TO service_role;
ALTER TABLE public.article_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a claim" ON public.article_claims FOR INSERT TO anon, authenticated WITH CHECK (true);