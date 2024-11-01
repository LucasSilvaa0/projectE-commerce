import type { Response } from "express";
import { connection, transporter } from "../db";

export default function cartFinishShopping(userId: number, res: Response) {
	connection.query(
		"SELECT username AS buyer_username FROM users WHERE id = ?",
		[userId],
		(err1, results1: any) => {
			connection.query(
				"SELECT marketproducts.id, marketproducts.product_name, marketproducts.product_price, users.username AS seller_username, users.email AS seller_email FROM cartproducts LEFT JOIN marketproducts ON marketproducts.id = cartproducts.product_id LEFT JOIN users ON users.id = marketproducts.seller_id WHERE cart_user_id = ?",
				[userId],
				(err2, results2: any) => {
					if (err2 !== null) {
						console.log("Ocorreu algum erro.");
						res.send(err2);
					} else {
						const result = {
							buyer_username: results1[0].buyer_username,
							products: results2,
						};

						console.log(result);
						for (let i = 0; i < results2.length; i++) {
							connection.query(
								"DELETE FROM cartproducts WHERE product_id = ?",
								[result.products[i].id],
							);
							connection.query(
								"DELETE FROM marketproducts WHERE id = ?",
								[result.products[i].id],
								(error, results: any) => {
									if (error !== null) {
										console.log(error);
									} else {
										console.log(
											`Produto ${result.products[i].product_name} deletado com sucesso!`,
										);
									}
								},
							);
							sendSales(result.buyer_username, result.products[i]);
						}
						connection.query(
							"DELETE FROM cartproducts WHERE cart_user_id = ?",
							[userId],
							(err3, results3) => {
								if (err3 !== null) {
									res.send(err3);
								} else {
									res.send("Compra finalizada com sucesso.");
								}
							},
						);
					}
				},
			);
		},
	);
}

interface Product {
	id: number;
	product_name: string;
	product_price: number;
	seller_username: string;
	seller_email: string;
}

async function sendSales(buyer_username: string, product: Product) {
	try {
		const info = await transporter.sendMail({
			from: '"Ecommerce" donotreplyecommerceproject@gmail.com',
			to: product.seller_email,
			subject: "Produto vendido!",
			text: "",
			html: `<p>Olá, ${product.seller_username}! Gostaríamos de avisar que o seu produto ${product.product_name} foi vendido para ${buyer_username} por ${product.product_price}!</strong></p>`,
		});

		console.log("Email enviado: ", info.messageId);
	} catch (error) {
		console.error("Erro ao enviar email: ", error);
	}
}
