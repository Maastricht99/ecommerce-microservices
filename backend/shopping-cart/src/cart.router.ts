import express from "express";
import { getShoppingCart, addProductToCart, removeProductFromCart } from "./cart.controller";
import { validate } from "./validator.middleware";
import { AddProductToCartSchema } from "./schemas";

export const cartRouter = express.Router();

cartRouter.get("/cart", getShoppingCart);



cartRouter.post("/cart", validate(AddProductToCartSchema), addProductToCart);

cartRouter.delete("/cart", removeProductFromCart);