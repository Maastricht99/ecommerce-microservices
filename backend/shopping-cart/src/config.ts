import "dotenv/config";
import z from "zod";

const ConfigSchema = z.object({
    server: z.object({
        port: z.coerce.number()
    }),
    postgres: z.object({
        host: z.string(),
        port: z.coerce.number(),
        user: z.string(),
        password: z.string(),
        database: z.string()
    }),
    mongo: z.object({
        host: z.string(),
        port: z.coerce.number(),
        user: z.string(),
        password: z.string(),
        database: z.string()
    }),
    jwt: z.object({
        secret: z.string()
    })
});

function loadConfig() {
    const config = {
        server: {
            port: process.env.SERVER_PORT
        },
        postgres: {
            host: process.env.POSTGRES_DB_HOST,
            port: process.env.POSTGRES_DB_PORT,
            user: process.env.POSTGRES_DB_USER,
            password: process.env.POSTGRES_DB_PASSWORD,
            database: process.env.POSTGRES_DB_NAME,
        },
        mongo: {
            host: process.env.MONGO_DB_HOST,
            port: process.env.MONGO_DB_PORT,
            user: process.env.MONGO_DB_USER,
            password: process.env.MONGO_DB_PASSWORD,
            database: process.env.MONGO_DB_NAME,  
        },
        jwt: {
            secret: process.env.JWT_SECRET
        }
    }

    return ConfigSchema.parse(config);
}

export const config = loadConfig();

