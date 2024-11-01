import type { Request, Response } from "express";
import marketProducts from "../../functions/market_products";

export default function marketProductsRoute(req: Request, res: Response) {
	console.log("Alguém está querendo dar uma olhada na loja.");

	marketProducts(res);
}
