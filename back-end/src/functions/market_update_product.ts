import type { Response } from "express";
import { connection } from "../db";

interface ProductPriceScheme {
	new_name: string;
	new_description: string;
	new_price: number;
	product_id: number;
}

export default function marketUpdateProduct(
	productPriceScheme: ProductPriceScheme,
	res: Response,
) {
	const listUpdate = [
		productPriceScheme.new_name,
		productPriceScheme.new_description,
		productPriceScheme.new_price,
		productPriceScheme.product_id,
	];

	console.log(listUpdate);

	connection.query(
		"UPDATE marketproducts SET product_name = ?, product_description = ?, product_price = ? WHERE (id) = (?)",
		listUpdate,
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu um erro.");
				res.send(err);
			} else {
				console.log("Preço do produto modificado com sucesso.");
				res.send(results);
			}
		},
	);
}
