import {  Response } from "express";
import { AddProductToCartDTO, AuthRequest, RemoveProductFromCartDTO, TypedAuthRequest } from "../types";
import * as cartService from "../services/cart";

export async function getShoppingCart(req: AuthRequest, res: Response): Promise<Response> {
    const { userId } = req.auth;
    const cart = await cartService.getShoppingCart(userId);
    return res.status(200).json(cart);
}

export async function addProductToCart(req: TypedAuthRequest<AddProductToCartDTO>, res: Response): Promise<Response> {
    const { userId } = req.auth; 
    const { productId, quantity } = req.locals.body;
    await cartService.addProductToCart(userId, productId, quantity);
    return res.status(201);
}

export async function removeProductFromCart(req: TypedAuthRequest<RemoveProductFromCartDTO>, res: Response): Promise<Response> {
    const { userId } = req.auth;
    const { productId } = req.locals.body;
    await cartService.removeProductFromCart(userId, productId);
    return res.status(201);
}