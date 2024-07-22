import express from "express";
import { cartRouter } from "./cart";

export const router = express.Router();

router.use(cartRouter);