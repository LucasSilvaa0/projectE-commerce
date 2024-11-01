import type { Request, Response } from "express";
import { UpdatePriceModel } from "../models";
import marketUpdateProduct from "../../functions/market_update_product";

export default function marketUpdateProductRoute(req: Request, res: Response) {
	console.log("Alguém está querendo modificar o preço de um produto.");

	const updatePriceScheme = req.body;

	const result = UpdatePriceModel.safeParse(updatePriceScheme);

	if (result.success) {
		marketUpdateProduct(updatePriceScheme, res);
	} else {
		console.log(updatePriceScheme);
		res.send("Ocorreu algum erro na estrutura do JSON.");
	}
}
