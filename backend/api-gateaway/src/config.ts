import { z } from "zod"

const EnvSchema = z.object({
    server: z.object({
        port: z.coerce.number()
    }),
    service: z.object({
        auth: z.object({
            host: z.string(),
            port: z.coerce.number()
        }),
        productCatalog: z.object({
            host: z.string(),
            port: z.coerce.number()
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
                host: process.env.AUTH_SERVICE_HOST,
                port: process.env.AUTH_SERVICE_PORT
            },
            productCatalog: {
                host: process.env.PRODUCT_CATALOG_HOST,
                port: process.env.PRODUCT_CATALOG_PORT
            }
        }
    }

    return EnvSchema.parse(env);
}