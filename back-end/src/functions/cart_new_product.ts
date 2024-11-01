import type { Response } from "express";
import { connection } from "../db";
import type { QueryError } from "mysql2";

interface NewProductScheme {
	cart_user_id: number;
	product_id: number;
}

export default function cartNewProduct(
	newProductScheme: NewProductScheme,
	res: Response,
) {
	const listNewProduct = [
		newProductScheme.cart_user_id,
		newProductScheme.product_id,
	];

	connection.query(
		"INSERT INTO cartproducts (cart_user_id, product_id) VALUES (?, ?)",
		listNewProduct,
		(err) => {
			if (err !== null) {
				console.log("Ocorreu algum erro.");
				res.send(err);
			} else {
				res.send("Produto salvo ao carrinho com sucesso.");
			}
		},
	);
}
