import { z } from "zod"

const EnvSchema = z.object({
    server: z.object({
        port: z.coerce.number()
    }),
    service: z.object({
        auth: z.object({
            url: z.string()
        })
    })
});

export type Env = z.infer<typeof EnvSchema>;

export default () => {
    const env = {
        server: {
            port: process.env.SERVER_PORT
        },
        service: {
            auth: {
                url: process.env.AUTH_SERVICE_URL
            }
        }
    }

    return EnvSchema.parse(env);
}