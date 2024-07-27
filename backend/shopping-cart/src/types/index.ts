import { Request } from "express"
import { ObjectId } from "mongodb";
import { z } from "zod";

type ReqLocals = {
    body?: any;
    params?: any;
    query?: any ; 
}

type Auth = {
    userId: string;
}

export interface AuthRequest extends Request {
    auth: Auth
}

export interface TypedRequest<T extends ReqLocals> extends Request {
    locals: T;
}

export interface TypedAuthRequest<T extends ReqLocals> extends TypedRequest<T> {
    auth: Auth;
};

export type TokenPayload = {
    user_id: string;
}

export type DBProduct = {
    id: string;
    name: string;
    price: number;
}

export type DBCart = {
    _id?: ObjectId;
    userId: string;
    totalPrice: number;
    products: DBProductItem[];
}

export type DBProductItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
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