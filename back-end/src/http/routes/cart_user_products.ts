import type { Request, Response } from "express";
import cartUserProducts from "../../functions/cart_user_products";

export default function cartUserProductsRoute(req: Request, res: Response) {
	console.log("Alguém está querendo ver os produtos do seu carrinho.");

	const userId = Number(req.params.userId);

	cartUserProducts(userId, res);
}
