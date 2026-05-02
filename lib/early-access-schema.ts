import { z } from "zod";

export const earlyAccessBodySchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().max(120).optional(),
});

export type EarlyAccessInput = z.infer<typeof earlyAccessBodySchema>;
