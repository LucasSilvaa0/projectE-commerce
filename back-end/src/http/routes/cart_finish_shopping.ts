import type { Request, Response } from "express";
import cartFinishShopping from "../../functions/cart_finish_shopping";

export default function cartFinishShoppingRoute(req: Request, res: Response) {
	console.log(
		"Alguém está querendo finalizar as compras dos produtos do carrinho.",
	);

	const userId = Number(req.params.id);

	cartFinishShopping(userId, res);
}
