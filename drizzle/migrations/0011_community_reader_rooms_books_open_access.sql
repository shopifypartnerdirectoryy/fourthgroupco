ALTER TABLE public.community_posts DROP CONSTRAINT community_posts_category_check;
ALTER TABLE public.community_posts ADD CONSTRAINT community_posts_category_check CHECK (category = ANY (ARRAY['announcements','discussions','success','reviews','publishing','marketing','agents','film','resources','book-updates','questions','pro','introductions','craft','screen','reader-corner','recommendations','street-team']));
ALTER TABLE public.community_posts ADD COLUMN IF NOT EXISTS book_key text CHECK (book_key IS NULL OR length(book_key) <= 60);
-- Payments are paused: any signed-in account can use the community for now.
CREATE OR REPLACE FUNCTION public.has_member_access(_uid uuid)
 RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT _uid IS NOT NULL $$;
CREATE OR REPLACE FUNCTION public.community_post_total()
 RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT count(*) FROM public.community_posts WHERE NOT hidden $$;
CREATE OR REPLACE FUNCTION public.community_member_total()
 RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public', 'auth'
AS $$ SELECT count(*) FROM auth.users WHERE email_confirmed_at IS NOT NULL $$;
GRANT EXECUTE ON FUNCTION public.community_post_total() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.community_member_total() TO anon, authenticated;