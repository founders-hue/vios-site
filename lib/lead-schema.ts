import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name." })
    .max(100, { message: "Name is a bit long." }),
  company: z
    .string()
    .trim()
    .min(1, { message: "Please enter a company or property name." })
    .max(100, { message: "That is too long." }),
  email: z.string().trim().email({ message: "Please enter a valid email." }).max(200),
  location: z
    .string()
    .trim()
    .min(2, { message: "Where is the property?" })
    .max(200, { message: "Shorten the location, please." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell us a little more, even one sentence." })
    .max(2000, { message: "That is more than we need to start." }),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadFieldErrors = Partial<Record<keyof LeadInput, string>>;
