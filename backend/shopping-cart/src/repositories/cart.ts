import { ObjectId } from "mongodb";
import { mongo } from "../providers/mongo";
import { DBCart, DBProductItem } from "../types";

export async function getCartByUserId(userId: string) {
    return mongo.db().collection("carts").findOne<DBCart>({ userId });    
}

export async function createCart(cart: DBCart) {
    return mongo.db().collection("carts").insertOne(cart);
}

export async function addProductToCart(cart: DBCart, product: DBProductItem) {
    cart.products.push(product);
    cart.totalPrice += product.price * product.quantity;

    await mongo.db().collection("carts").updateOne(
        { _id: cart._id },
        { $set: cart }
    );
}

export async function removeProductFromCart(cart: DBCart, product: DBProductItem) {
    const productToRemoveIdx = cart.products.indexOf(product);

    cart.products = cart.products.splice(productToRemoveIdx, 1);
    cart.totalPrice -= product.price * product.quantity;

    await mongo.db().collection("carts").updateOne(
        { _id: cart._id },
        { $set: cart }
    );
}