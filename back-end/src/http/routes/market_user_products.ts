import type { Request, Response } from "express";
import marketUserProducts from "../../functions/market_user_products";

export default function marketUserProductsRoute(req: Request, res: Response) {
	console.log("Alguém está querendo ver seus próprios produtos.");

	const userId = Number(req.params.userId);

	marketUserProducts(userId, res);
}
