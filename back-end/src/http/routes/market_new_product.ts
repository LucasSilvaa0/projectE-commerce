import type { Request, Response } from "express";
import { MarketProductModel } from "../models";
import marketNewProduct from "../../functions/market_new_product";

export default function marketNewProductRoute(req: Request, res: Response) {
	console.log("Tem alguém querendo oferecer um novo produto.");

	const newProductScheme = req.body;

	const result = MarketProductModel.safeParse(newProductScheme);

	console.log(result);

	if (result.success) {
		marketNewProduct(newProductScheme, res);
	} else {
		res.send("Ocorreu algum erro na estrutura do JSON.");
	}
}
