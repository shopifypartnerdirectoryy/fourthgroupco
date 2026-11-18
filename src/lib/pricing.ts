/** Targeted reader email campaigns: $0.50 per contact, 1,000–10,000 contacts in steps of 1,000. */
export const EMAIL_RATE_USD = 0.5;
export const EMAIL_MIN = 1000;
export const EMAIL_MAX = 10000;
export const EMAIL_STEP = 1000;

export function clampContacts(n: number): number {
  if (!Number.isFinite(n)) return EMAIL_MIN;
  const stepped = Math.round(n / EMAIL_STEP) * EMAIL_STEP;
  return Math.min(EMAIL_MAX, Math.max(EMAIL_MIN, stepped));
}

export function emailCampaignPrice(contacts: number): number {
  return clampContacts(contacts) * EMAIL_RATE_USD;
}

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
