CREATE OR REPLACE FUNCTION public.check_membership_referral()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.referral_code IS NULL OR NOT public.validate_referral_code(NEW.referral_code) THEN
    RAISE EXCEPTION 'A valid four-digit referral code is required';
  END IF;
  RETURN NEW;
END $$;