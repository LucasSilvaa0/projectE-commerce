import connection from "./db";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

export function searchUser(userScheme: any, res: any, type: number) {
	connection.query(
		"SELECT * FROM users WHERE (email) = (?) LIMIT 1",
		[userScheme.email],
		(err, results: any) => {
			if (err) {
				console.log(`Ocorreu um erro: ${err}`);
			}
			if (results && results[0]) {
				switch (type) {
					case 0:
						console.log("Esse email já está sendo utilizado.");
						res.send([]);
						break;
					case 1:
						res.send(results[0]);
						sendPassword(userScheme, results[0].userpassword);
						break;
					case 2:
						login(userScheme, results[0].userpassword, res);
						break;
				}
			} else {
				switch (type) {
					case 0:
						createUser(userScheme, res);
						break;
					case 1:
						console.log("Esse email não está cadastrado.");
						res.send("erro");
						break;
					case 2:
						console.log("Esse email não está cadastrado.");
						res.send("erro");
						break;
				}
			}
		},
	);
}

function createUser(newUserScheme: any, res: any) {
	const listNewUser = [
		newUserScheme.username,
		newUserScheme.email,
		newUserScheme.userpassword,
	];

	connection.query(
		"INSERT INTO users (username, email, userpassword) VALUES (?, ?, ?)",
		listNewUser,
		(err, results) => {
			if (err == null) console.log("Usuário cadastrado com sucesso.");
		},
	);

	res.send(newUserScheme);
}

dotenv.config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

transporter.verify((error, success) => {
	if (error) {
		console.error("Erro na configuração do transporte:", error);
	} else {
		console.log("Transporte configurado corretamente:", success);
	}
});

async function sendPassword(userScheme: any, password: string) {
	try {
		const info = await transporter.sendMail({
			from: '"Ecommerce" donotreplyecommerceproject@gmail.com',
			to: userScheme.email,
			subject: "Recuperação de senha",
			text: "",
			html: `<p>A senha do email solicitado é: <br><strong>${password}</strong></p>`,
		});

		console.log("Email enviado: ", info.messageId);
	} catch (error) {
		console.error("Erro ao enviar email: ", error);
	}
}

function login(userScheme: any, password: string, res: any) {
	if (userScheme.userpassword === password) {
		console.log("A tentativa de login foi concluída com sucesso.");
		res.send(userScheme);
	} else {
		console.log("O email ou a senha estão incorretos.");
		res.send("Login incorreto.");
	}
}

export function offerProduct(userScheme: any, res: any) {
	const listMarketProduct = [
		userScheme.seller_id,
		userScheme.product_name,
		userScheme.product_description,
		userScheme.product_price,
		userScheme.photo_link,
	];

	connection.query(
		"INSERT INTO marketproducts (seller_id, product_name, product_description, product_price, photo_link) VALUES (?, ?, ?, ?, ?)",
		listMarketProduct,
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu algum erro");
				res.send("Erro ao tentar cadastrar o produto");
			} else {
				res.send("Produto cadastrado com sucesso.");
			}
		},
	);
}

export function delProduct(produtctId: any, res: any) {
	connection.query(
		"DELETE FROM marketproducts WHERE id=?",
		[produtctId],
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu um erro.");
				res.send("Erro ao tentar deletar o produto.");
			} else {
				res.send("Produto deletado com sucesso.");
			}
		},
	);
}

export function updateProductPrice(productPriceScheme: any, res: any) {
	const listUpdate = [
		productPriceScheme.new_price,
		productPriceScheme.product_id,
		productPriceScheme.seller_id,
	];

	console.log(listUpdate);

	connection.query(
		"UPDATE marketproducts SET product_price = ? WHERE (id, seller_id) = (?, ?)",
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

export function showProducts(res: any, type: number, id: any = 0) {
	switch (type) {
		case 0:
			connection.query("SELECT * FROM marketproducts", [], (err, results) => {
				if (err !== null) {
					console.log("Ocorreu um erro.");
					res.send("Erro ao tentar ver os produtos.");
				} else {
					res.send(results);
				}
			});
			break;
		case 1:
			connection.query(
				"SELECT * FROM marketproducts WHERE seller_id = ?",
				[id],
				(err, results) => {
					if (err !== null) {
						console.log("Ocorreu um erro.");
						res.send("Erro ao tentar ver os próprios produtos.");
					} else {
						res.send(results);
					}
				},
			);
	}
}

export function newCartProduct(newProductScheme: any, res: any) {
	const listNewProduct = [
		newProductScheme.cart_user_id,
		newProductScheme.product_id,
	];

	connection.query(
		"INSERT INTO cartproducts (cart_user_id, product_id) VALUES (?, ?)",
		listNewProduct,
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu algum erro.");
				res.send(err);
			} else {
				res.send("Produto salvo ao carrinho com sucesso.");
			}
		},
	);
}

export function delCartProduct(productId: any, res: any) {
	connection.query(
		"DELETE FROM cartproducts WHERE id = ?",
		[productId],
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu algum erro.");
				res.send(err);
			} else {
				res.send("Produto deletado do carrinho com sucesso.");
			}
		},
	);
}

export function resetCart(userId: any, res: any) {
	connection.query(
		"DELETE FROM cartproducts WHERE cart_user_id = ?",
		[userId],
		(err, results) => {
			if (err !== null) {
				console.log("Ocorreu algum erro.");
				res.send(err);
			} else {
				res.send("Carrinho esvaziado com sucesso.");
			}
		},
	);
}

export function finishShopping(userId: any, res: any) {
	connection.query(
		"SELECT * FROM cartproducts WHERE cart_user_id = ?",
		[userId],
		(err1, results1: any) => {
			if (err1 !== null) {
				console.log("Ocorreu algum erro.");
				res.send(err1);
			} else {
				const listProducts = results1;
				for (let i = 0; i < listProducts.length; i++) {
					connection.query(
						"DELETE FROM marketproducts WHERE id = ?",
						[listProducts[i].product_id],
						(err2, results2) => {
							if (err2 !== null) {
								res.send(err2);
							}
						},
					);
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
}
