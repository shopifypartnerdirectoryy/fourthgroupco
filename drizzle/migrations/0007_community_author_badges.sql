ALTER TABLE public.community_posts ADD COLUMN IF NOT EXISTS author_badge text NOT NULL DEFAULT 'member';
ALTER TABLE public.community_replies ADD COLUMN IF NOT EXISTS author_badge text NOT NULL DEFAULT 'member';
CREATE OR REPLACE FUNCTION public.set_author_badge() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.author_badge := CASE
    WHEN public.has_role(NEW.author_id,'admin') THEN 'admin'
    WHEN public.has_role(NEW.author_id,'moderator') THEN 'moderator'
    WHEN public.has_pro(NEW.author_id) THEN 'pro'
    ELSE 'member' END;
  RETURN NEW;
END $$;
CREATE TRIGGER community_post_badge BEFORE INSERT ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.set_author_badge();
CREATE TRIGGER community_reply_badge BEFORE INSERT ON public.community_replies FOR EACH ROW EXECUTE FUNCTION public.set_author_badge();