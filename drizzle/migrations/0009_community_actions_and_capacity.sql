ALTER TABLE public.community_posts ADD COLUMN like_count integer NOT NULL DEFAULT 0;

CREATE TABLE public.community_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.community_likes TO authenticated;
GRANT ALL ON public.community_likes TO service_role;
ALTER TABLE public.community_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read likes" ON public.community_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users like posts" ON public.community_likes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users unlike own" ON public.community_likes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.community_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.community_bookmarks TO authenticated;
GRANT ALL ON public.community_bookmarks TO service_role;
ALTER TABLE public.community_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own bookmarks" ON public.community_bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users bookmark posts" ON public.community_bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users remove own bookmarks" ON public.community_bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.community_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  reporter_id uuid NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.community_reports TO authenticated;
GRANT ALL ON public.community_reports TO service_role;
ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reporters and staff read reports" ON public.community_reports FOR SELECT TO authenticated USING (auth.uid() = reporter_id OR public.is_staff(auth.uid()));
CREATE POLICY "Members report posts" ON public.community_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Staff resolve reports" ON public.community_reports FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.bump_like_count() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END $$;
CREATE TRIGGER community_likes_count AFTER INSERT OR DELETE ON public.community_likes FOR EACH ROW EXECUTE FUNCTION public.bump_like_count();

CREATE INDEX IF NOT EXISTS community_posts_category_idx ON public.community_posts (category);
CREATE INDEX IF NOT EXISTS community_posts_created_idx ON public.community_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS community_posts_author_idx ON public.community_posts (author_id);
CREATE INDEX IF NOT EXISTS community_posts_hidden_idx ON public.community_posts (hidden);
CREATE INDEX IF NOT EXISTS community_posts_search_idx ON public.community_posts USING gin (to_tsvector('english', title || ' ' || body));
CREATE INDEX IF NOT EXISTS community_replies_post_idx ON public.community_replies (post_id);
CREATE INDEX IF NOT EXISTS community_likes_post_idx ON public.community_likes (post_id);
CREATE INDEX IF NOT EXISTS community_likes_user_idx ON public.community_likes (user_id);
CREATE INDEX IF NOT EXISTS community_bookmarks_user_idx ON public.community_bookmarks (user_id);