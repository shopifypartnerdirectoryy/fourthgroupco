import { describe, expect, it } from "vitest";
import { clampContacts, emailCampaignPrice } from "./pricing";

describe("email campaign pricing", () => {
  it("1,000 contacts cost $500", () => expect(emailCampaignPrice(1000)).toBe(500));
  it("5,000 contacts cost $2,500", () => expect(emailCampaignPrice(5000)).toBe(2500));
  it("10,000 contacts cost $5,000", () => expect(emailCampaignPrice(10000)).toBe(5000));
  it("never goes below 1,000 contacts", () => expect(clampContacts(200)).toBe(1000));
  it("never goes above 10,000 contacts", () => expect(clampContacts(25000)).toBe(10000));
});
