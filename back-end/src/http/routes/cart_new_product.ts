import type { Request, Response } from "express";
import { CartProductModel } from "../models";
import cartNewProduct from "../../functions/cart_new_product";

export default function cartNewProductRoute(req: Request, res: Response) {
	console.log("Alguém está querendo adicionar um produto ao carrinho.");

	const newProductScheme = req.body;

	console.log(newProductScheme);

	const result = CartProductModel.safeParse(newProductScheme);

	if (result.success) {
		cartNewProduct(newProductScheme, res);
	} else {
		console.log("Ocorreu algum erro na estrutura do JSON.");
	}
}
