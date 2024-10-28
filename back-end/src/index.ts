import express from "express";

import {
	UserModel,
	MarketProductModel,
	UpdatePriceModel,
	CartProductModel,
} from "./models";
import {
	showProducts,
	offerProduct,
	delProduct,
	searchUser,
	updateProduct,
	newCartProduct,
	delCartProduct,
	resetCart,
	finishShopping,
	showCart,
} from "./functions";

const app = express();
const port = 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

app.post("/", (req, res) => {
	console.log("Alguém entrou no servidor! ");

	const corpo: JSON = req.body;

	res.send(corpo);
});

app.post("/user/new_user", (req, res) => {
	console.log("Alguém está tentanto criar um novo usuário! ");

	const newUserScheme = req.body;

	const result = UserModel.safeParse(newUserScheme);
	if (result.success) {
		console.log("Validação bem-sucedida:", result.data);
		searchUser(newUserScheme, res, 0);
	} else {
		console.log("Erro de validação:", result.error.errors);
	}
});

app.post("/user/forgot_password", (req, res) => {
	console.log("Alguém está querendo lembrar da senha. ");

	const userEmail = req.body;

	searchUser(userEmail, res, 1);
});

app.post("/user/login", (req, res) => {
	console.log("Alguém está querendo logar a conta.");

	const user = req.body;

	searchUser(user, res, 2);
});

app.post("/market/new_product", (req, res) => {
	console.log("Tem alguém querendo oferecer um novo produto.");

	const newProductScheme = req.body;

	const result = MarketProductModel.safeParse(newProductScheme);

	console.log(result);

	if (result.success) {
		offerProduct(newProductScheme, res);
	} else {
		res.send("Ocorreu algum erro na estrutura do JSON.");
	}
});

app.delete("/market/del_product/:id", (req, res) => {
	console.log("Alguém está querendo deletar um produto do mercado.");

	const productId = req.params.id;

	delProduct(productId, res);
});

app.put("/market/update_product", (req, res) => {
	console.log("Alguém está querendo modificar o preço de um produto.");

	const updatePriceScheme = req.body;

	const result = UpdatePriceModel.safeParse(updatePriceScheme);

	if (result.success) {
		updateProduct(updatePriceScheme, res);
	} else {
		console.log(updatePriceScheme);
		res.send("Ocorreu algum erro na estrutura do JSON.");
	}
});

app.get("/market/products", (req, res) => {
	console.log("Alguém está querendo dar uma olhada na loja.");

	showProducts(res, 0);
});

app.get("/market/myproducts/:userId", (req, res) => {
	console.log("Alguém está querendo ver seus próprios produtos.");

	const userId = req.params.userId;

	showProducts(res, 1, userId);
});

app.get("/market/cart/:userId", (req, res) => {
	console.log("Alguém está querendo ver os produtos do seu carrinho.");

	const userId = Number(req.params.userId);

	showCart(userId, res);
});

app.post("/market/cart/new_product", (req, res) => {
	console.log("Alguém está querendo adicionar um produto ao carrinho.");

	const newProductScheme = req.body;

	const result = CartProductModel.safeParse(newProductScheme);

	if (result.success) {
		newCartProduct(newProductScheme, res);
	} else {
		console.log("Ocorreu algum erro na estrutura do JSON.");
	}
});

app.delete("/market/cart/del_product/:id", (req, res) => {
	console.log("Alguém está querendo retirar um produto do carrinho.");

	const productId = req.params.id;

	delCartProduct(productId, res);
});

app.delete("/market/cart/reset/:id", (req, res) => {
	console.log("Alguém está querendo esvaziar o carrinho.");

	const userId = req.params.id;

	resetCart(userId, res);
});

app.get("/market/cart/finish/:id", (req, res) => {
	console.log(
		"Alguém está querendo finalizar as compras dos produtos do carrinho.",
	);

	const userId = req.params.id;

	finishShopping(userId, res);
});
