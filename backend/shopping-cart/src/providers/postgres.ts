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

export async function createTables() {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DOUBLE PRECISION NOT NULL
        )
    `;

    await postgres.query(query);
}
