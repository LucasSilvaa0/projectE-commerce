import { z } from "zod";

export const NewUser = z.object({
    username: z.string().min(1).max(100),
    email: z.string().email().min(1).max(100),
    userpassword: z.string().min(1).max(100)
});