import { Pool } from "pg";
import { config } from "../config";

function  loadPostgres() {
    const { postgres: { host, port, user, password, database } } = config;

    return new Pool({
        host,
        port,
        user,
        password,
        database,
    });
}

export const postgres = loadPostgres();
