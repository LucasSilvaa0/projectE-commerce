import type { Response } from "express";
import { connection } from "../db";

export default function marketUserProducts(userId: number, res: Response) {
	connection.query(
		"SELECT * FROM marketproducts WHERE seller_id = ?",
		[userId],
		(err1, results1) => {
			connection.query(
				"SELECT username FROM users WHERE id = ?",
				[userId],
				(err2, results2: any) => {
					if (err2 !== null) {
						console.log("Ocorreu um erro.");
						res.send("Erro ao tentar ver os próprios produtos.");
					} else {
						res.send({
							products: results1,
							user: results2[0],
						});
					}
				},
			);
		},
	);
}
