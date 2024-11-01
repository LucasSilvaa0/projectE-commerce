import type { Response } from "express";
import { connection } from "../db";

export default function marketDelProduct(produtctId: number, res: Response) {
	connection.query(
		"DELETE FROM marketproducts WHERE id=?",
		[produtctId],
		(err) => {
			if (err !== null) {
				console.log("Ocorreu um erro.");
				res.send("Erro ao tentar deletar o produto.");
			} else {
				res.send("Produto deletado com sucesso.");
			}
		},
	);
}
