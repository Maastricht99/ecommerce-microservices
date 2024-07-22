import "dotenv/config";
import z from "zod";

const ConfigSchema = z.object({
    server: z.object({
        port: z.coerce.number()
    })
});

function loadConfig() {
    const config = {
        server: {
            port: process.env.SERVER_PORT
        }
    }

    return ConfigSchema.parse(config);
}

export const config = loadConfig();

export type Config = z.infer<typeof ConfigSchema>;

