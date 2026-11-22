DROP POLICY IF EXISTS "Members read likes" ON public.community_likes;
CREATE POLICY "Members read own likes" ON public.community_likes
FOR SELECT TO authenticated
USING (auth.uid() = user_id);