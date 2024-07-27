import { DBCart, DBProductItem } from "../types";
import { mongo } from "../providers/mongo";
import * as productRepo from "../repositories/product";
import * as cartRepo from "../repositories/cart";

export async function getShoppingCart(userId: string) {
    const cart = await cartRepo.getCartByUserId(userId);
    return cart;
}

export async function addProductToCart(userId: string, productId: string, quantity: number) {
    const product = await productRepo.getProductById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }

    const productToAdd: DBProductItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
    } 

    const cart = await cartRepo.getCartByUserId(userId);  
    
    if (!cart) {
        const newCart: DBCart = {
            userId,
            totalPrice: product.price * quantity,
            products: [productToAdd]
        }
        
        await cartRepo.createCart(newCart);
        return;
    }

    const isProductAlreadyInCart = cart.products.some(p => p.id === productId);
    if (isProductAlreadyInCart) {
        throw new Error("Product already in cart");
    }

    await cartRepo.addProductToCart(cart, productToAdd);
}

export async function removeProductFromCart(userId: string, productId: string) {
    const product = await productRepo.getProductById(productId);

    if (!product) {
        throw new Error("Product not found");
    }
    const cart = await mongo.db().collection("carts").findOne<DBCart>({ userId });  
    
    if (!cart) {
        throw new Error("Cart not found");
    }

    const productToRemove = cart.products.find(p => p.id === productId)
    if (!productToRemove) {
        throw new Error("Product not found in cart")
    }

    await cartRepo.removeProductFromCart(cart, productToRemove);

}
