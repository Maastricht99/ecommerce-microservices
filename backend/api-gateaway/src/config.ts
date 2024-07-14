import { z } from "zod"

const EnvSchema = z.object({
    server: z.object({
        port: z.coerce.number()
    })
});

export type Env = z.infer<typeof EnvSchema>;

export default () => {
    const env = {
        server: {
            port: process.env.SERVER_PORT
        }
    }

    return EnvSchema.parse(env);
}