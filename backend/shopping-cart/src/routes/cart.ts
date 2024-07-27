import express, { Request, Response } from "express";
import { getShoppingCart, addProductToCart, removeProductFromCart } from "../controllers/cart";
import { validate } from "../middlewares/validator";
import { AddProductToCartSchema, RemoveProductFromCartSchema } from "../types";
import * as productRepo from "../repositories/product"; 
import { authenticate } from "../middlewares/authenticator";

export const cartRouter = express.Router();

cartRouter.get("/cart", authenticate, getShoppingCart);

cartRouter.post("/cart", authenticate, validate(AddProductToCartSchema), addProductToCart);

cartRouter.delete("/cart", authenticate, validate(RemoveProductFromCartSchema), removeProductFromCart);

cartRouter.get("/test", async (_req: Request, res: Response) => {
    const products = await productRepo.getAllProducts();
    return res.status(201).json(products);
})

cartRouter.post("/test", async (req: Request, res: Response) => {
    const { id, name, price } = req.body;
    await productRepo.addProduct(id, name, price);
    return res.status(201).json();
})