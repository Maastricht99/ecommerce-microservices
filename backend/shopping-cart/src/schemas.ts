import z from "zod";

export const AddProductToCartSchema = z.object({
    body: z.object({
        productId: z.string(),
        quantity: z.number().min(1)
    })
})

export type AddProductToCartSchemaDTO = z.infer<typeof AddProductToCartSchema>;