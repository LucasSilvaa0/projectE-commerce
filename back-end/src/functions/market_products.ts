import type { Response } from "express";
import { connection } from "../db";

export default function marketProducts(res: Response) {
	connection.query("SELECT * FROM marketproducts", [], (err, results) => {
		if (err !== null) {
			console.log("Ocorreu um erro.");
			res.send("Erro ao tentar ver os produtos.");
		} else {
			res.send(results);
		}
	});
}
