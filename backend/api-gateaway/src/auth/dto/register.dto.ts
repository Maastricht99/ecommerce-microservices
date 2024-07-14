import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string(),
    password: z.string()
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;