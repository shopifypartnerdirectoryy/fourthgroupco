CREATE TABLE public.campaign_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  project_title text NOT NULL,
  genre text NOT NULL,
  campaign_goal text NOT NULL,
  budget_range text,
  interest text,
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.campaign_requests TO anon, authenticated;
GRANT SELECT ON public.campaign_requests TO authenticated;
GRANT ALL ON public.campaign_requests TO service_role;
ALTER TABLE public.campaign_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a campaign proposal" ON public.campaign_requests
FOR INSERT TO anon, authenticated WITH CHECK (
  consent = true
  AND char_length(trim(full_name)) BETWEEN 2 AND 120
  AND char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(trim(project_title)) BETWEEN 1 AND 200
  AND char_length(genre) BETWEEN 1 AND 60
  AND char_length(campaign_goal) BETWEEN 1 AND 80
  AND (budget_range IS NULL OR char_length(budget_range) <= 40)
  AND (interest IS NULL OR char_length(interest) <= 120)
);
CREATE POLICY "Admins can view campaign requests" ON public.campaign_requests
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));