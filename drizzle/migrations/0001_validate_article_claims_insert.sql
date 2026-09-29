DROP POLICY "Anyone can submit a claim" ON public.article_claims;

CREATE POLICY "Anyone can submit a validated claim"
ON public.article_claims
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(first_name)) BETWEEN 1 AND 100
  AND length(trim(last_name)) BETWEEN 1 AND 100
  AND length(trim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (story IS NULL OR length(story) <= 2000)
);