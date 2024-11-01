import type { Request, Response } from "express";
import cartDelProduct from "../../functions/cart_del_product";

export default function cartDelProductRoute(req: Request, res: Response) {
	console.log("Alguém está querendo retirar um produto do carrinho.");

	const productId = Number(req.params.id);

	cartDelProduct(productId, res);
}
