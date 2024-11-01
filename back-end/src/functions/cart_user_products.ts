import type { Response } from "express";
import { connection } from "../db";

export default function cartUserProducts(userId: number, res: Response) {
	connection.query(
		"SELECT cartproducts.id, cartproducts.cart_user_id, marketproducts.product_name, marketproducts.product_price, marketproducts.photo_link, users.username AS product_seller FROM cartproducts LEFT JOIN marketproducts ON cartproducts.product_id = marketproducts.id LEFT JOIN users ON marketproducts.seller_id = users.id WHERE cartproducts.cart_user_id = ?",
		[userId],
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu algum erro.");
				return res.send(err);
			}
			return res.send(results);
		},
	);
}
