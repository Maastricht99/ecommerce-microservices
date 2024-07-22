import { Request, Response } from "express";
import { AddProductToCartDTO, RemoveProductFromCartDTO, TypedAuthRequest, TypedRequest } from "../types";

export async function getShoppingCart(req: Request, res: Response): Promise<Response> {
    return res.status(200).json("GET");
}

export async function addProductToCart(req: TypedAuthRequest<AddProductToCartDTO>, res: Response): Promise<Response> {    
    return res.status(200).json("POST");
}

export async function removeProductFromCart(req: TypedAuthRequest<RemoveProductFromCartDTO>, res: Response): Promise<Response> {
    return res.status(200).json("DELETE");
}