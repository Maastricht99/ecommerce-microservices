import express, { Request, Response } from "express";
import { getShoppingCart, addProductToCart, removeProductFromCart } from "../controllers/cart";
import { validate } from "../middlewares/validator";
import { AddProductToCartSchema, RemoveProductFromCartSchema } from "../types";
import * as productRepo from "../repositories/product"; 

export const cartRouter = express.Router();

cartRouter.get("/cart", getShoppingCart);

cartRouter.post("/cart", validate(AddProductToCartSchema), addProductToCart);

cartRouter.delete("/cart", validate(RemoveProductFromCartSchema), removeProductFromCart);

cartRouter.get("/test", async (_req: Request, res: Response) => {
    const products = await productRepo.getAllProducts();
    return res.status(201).json(products);
})

cartRouter.post("/test", async (req: Request, res: Response) => {
    const { id, name, price } = req.body;
    await productRepo.addProduct(id, name, price);
    return res.status(201).json();
})