import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["buyer", "seller", "admin"])
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;