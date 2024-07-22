import { Request } from "express"
import { z } from "zod";

type ReqLocals = {
    body?: any;
    params?: any;
    query?: any ; 
}

type Auth = {
    userId: string;
}

export interface TypedRequest<T extends ReqLocals> extends Request {
    locals: T;
}

export interface TypedAuthRequest<T extends ReqLocals> extends TypedRequest<T> {
    auth: Auth;
}

export type DBProduct = {
    id: string;
    name: string;
    price: number;
}

export const AddProductToCartSchema = z.object({
    body: z.object({
        productId: z.string(),
        quantity: z.number().min(1)
    })
})

export type AddProductToCartDTO = z.infer<typeof AddProductToCartSchema>;

export const RemoveProductFromCartSchema = z.object({
    body: z.object({
        productId: z.string()
    })
});

export type RemoveProductFromCartDTO = z.infer<typeof RemoveProductFromCartSchema>;