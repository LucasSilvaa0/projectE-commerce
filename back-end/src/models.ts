import { z } from "zod";

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
})