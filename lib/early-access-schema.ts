import { z } from "zod";

/** Public waitlist fields + anti-abuse (Turnstile token, honeypot `company`). */
export const earlyAccessRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().max(120).optional(),
  locale: z.enum(["en", "pl"]).optional(),
  turnstileToken: z.string().optional(),
  /** Honeypot - must stay empty. */
  company: z.string().max(200).optional(),
});

export type EarlyAccessRequest = z.infer<typeof earlyAccessRequestSchema>;
