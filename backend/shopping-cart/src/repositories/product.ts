import { QueryResult } from "pg";
import { postgres } from "../providers/postgres";
import { DBProduct } from "../types";

export async function getProductById(id: string) {
    const query = `SELECT * FROM products WHERE id = $1;`;
    const { rows: [product] }: QueryResult<DBProduct> = await postgres.query(query, [id]);
    if (!product) {
        return null;
    }

    return product;
}

export async function getAllProducts() {
    const query = `SELECT * FROM products;`;
    const { rows }: QueryResult<DBProduct> = await postgres.query(query);
    return rows;
}

export async function addProduct(id: string, name: string, price: number) {
    const query = `INSERT INTO products (id, name, price) VALUES ($1, $2, $3);`;
    await postgres.query(query, [id, name, price]);
}