import type { Request, Response } from "express";
import marketDelProduct from "../../functions/market_del_product";

export default function marketDelProductRoute(req: Request, res: Response) {
	console.log("Alguém está querendo deletar um produto do mercado.");

	const productId = Number(req.params.id);

	marketDelProduct(productId, res);
}
