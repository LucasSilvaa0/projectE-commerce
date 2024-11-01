import { connection } from "../db";
import type { Response } from "express";

interface ProductScheme {
	seller_id: number;
	product_name: string;
	product_description: string;
	product_price: number;
	photo_link: string;
}

export default function marketNewProduct(
	productScheme: ProductScheme,
	res: Response,
) {
	const listMarketProduct = [
		productScheme.seller_id,
		productScheme.product_name,
		productScheme.product_description,
		productScheme.product_price,
		productScheme.photo_link,
	];

	connection.query(
		"INSERT INTO marketproducts (seller_id, product_name, product_description, product_price, photo_link) VALUES (?, ?, ?, ?, ?)",
		listMarketProduct,
		(err) => {
			if (err !== null) {
				console.log("Ocorreu algum erro");
				res.send("Erro ao tentar cadastrar o produto");
			} else {
				res.send("Produto cadastrado com sucesso.");
			}
		},
	);
}
