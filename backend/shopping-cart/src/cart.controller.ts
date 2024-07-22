import { Request, Response } from "express";
import { AddProductToCartSchemaDTO } from "./schemas";

interface TypedRequest<T extends { body?: any, params?: any, query?: any }> extends Request {
    body: T["body"];
    params: T["params"];
    query: T["query"];
}

export async function getShoppingCart(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("GET");
}

export async function addProductToCart(req: TypedRequest<AddProductToCartSchemaDTO>, res: Response): Promise<Response> {
    return res.status(200).json("POST");
}

export async function removeProductFromCart(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("DELETE");
}