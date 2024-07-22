import express from "express";
import { cartRouter } from "./cart.router";

export const app = express();

app.use(express.json());

app.use(cartRouter);