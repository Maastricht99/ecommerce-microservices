import { QueryResult } from "pg";
import { postgres } from "../providers/postgres";
import { AddProductToCartDTO } from "../types";
import { mongo } from "../providers/mongo";
import { getProductById } from "../repositories/product";

export async function addProductToCart(userId: string, productId: string, quantity: number) {

    // get product from postgres db

    const product = getProductById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }

    // get cart by user id

    // if no cart, create

    // if product already in cart, throw error

    // if product not in cart, add
}
