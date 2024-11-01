import { connection } from "../db";
import type { Response } from "express";

export default function cartDelProduct(productId: number, res: Response) {
	connection.query(
		"DELETE FROM cartproducts WHERE id = ?",
		[productId],
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu algum erro.");
				res.send(err);
			} else {
				console.log("Produto removido com sucesso.");
				res.send("Produto deletado do carrinho com sucesso.");
			}
		},
	);
}
