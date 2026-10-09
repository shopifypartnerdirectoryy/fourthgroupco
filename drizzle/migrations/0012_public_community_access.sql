GRANT SELECT ON public.community_posts TO anon;
GRANT SELECT ON public.community_replies TO anon;

CREATE POLICY "Public read posts"
ON public.community_posts FOR SELECT TO anon, authenticated
USING (hidden = false AND category <> 'pro');

CREATE POLICY "Public read replies"
ON public.community_replies FOR SELECT TO anon, authenticated
USING (hidden = false AND EXISTS (SELECT 1 FROM public.community_posts p WHERE p.id = post_id AND p.hidden = false AND p.category <> 'pro'));

DROP POLICY "Members create posts" ON public.community_posts;
CREATE POLICY "Signed-in users create posts"
ON public.community_posts FOR INSERT TO authenticated
WITH CHECK (auth.uid() = author_id AND hidden = false AND reply_count = 0 AND (pinned = false OR is_staff(auth.uid())) AND (category <> 'announcements' OR is_staff(auth.uid())) AND (category <> 'pro' OR has_pro(auth.uid()) OR is_staff(auth.uid())));

DROP POLICY "Members reply" ON public.community_replies;
CREATE POLICY "Signed-in users reply"
ON public.community_replies FOR INSERT TO authenticated
WITH CHECK (auth.uid() = author_id AND hidden = false AND EXISTS (SELECT 1 FROM public.community_posts p WHERE p.id = post_id AND p.hidden = false));