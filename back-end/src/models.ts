import { z } from "zod";
import { delProduct } from "./functions";

export const UserModel = z.object({
    username: z.string().min(1).max(100),
    email: z.string().email().min(1).max(100),
    userpassword: z.string().min(1).max(100)
});

export const MarketProductModel = z.object({
    seller_id: z.number().int(),
    product_name: z.string().min(1),
    product_description: z.string(),
    product_price: z.number(),
    photo_link: z.string().url().max(2048)
});

export const UpdatePriceModel = z.object({
    seller_id: z.number().int(),
    product_id: z.number().int(),
    new_price: z.number()
});

export const CartProductModel = z.object({
    cart_user_id: z.number().int(),
    product_id: z.number().int()
});