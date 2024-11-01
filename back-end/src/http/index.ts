import express from "express";

// HTML POST
import newUserRoute from "./routes/new_user";
import forgotPasswordRoute from "./routes/forgot_password";
import loginRoute from "./routes/login";
import cartUserProductsRoute from "./routes/cart_user_products";
import marketNewProductRoute from "./routes/market_new_product";

// HTML DELETE
import marketDelProductRoute from "./routes/market_del_product";
import cartDelProductRoute from "./routes/cart_del_product";

// HTML PUT
import marketUpdateProductRoute from "./routes/market_update_product";

// HTML GET
import marketProductsRoute from "./routes/market_products";
import marketUserProductsRoute from "./routes/market_user_products";
import cartNewProductRoute from "./routes/cart_new_product";
import cartFinishShoppingRoute from "./routes/cart_finish_shopping";

export const app = express();
const port = 5000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

// HTML POST
app.post("/user/new_user", (req, res) => newUserRoute(req, res));
app.post("/user/forgot_password", (req, res) => forgotPasswordRoute(req, res));
app.post("/user/login", (req, res) => loginRoute(req, res));
app.post("/market/new_product", (req, res) => marketNewProductRoute(req, res));
app.post("/market/cart/new_product", (req, res) =>
	cartNewProductRoute(req, res),
);

// HTML DELETE
app.delete("/market/del_product/:id", (req, res) =>
	marketDelProductRoute(req, res),
);
app.delete("/market/cart/del_product/:id", (req, res) =>
	cartDelProductRoute(req, res),
);

// HTML PUT
app.put("/market/update_product", (req, res) =>
	marketUpdateProductRoute(req, res),
);

// HTML GET
app.get("/market/products", (req, res) => marketProductsRoute(req, res));
app.get("/market/myproducts/:userId", (req, res) =>
	marketUserProductsRoute(req, res),
);
app.get("/market/cart/:userId", (req, res) => cartUserProductsRoute(req, res));
app.get("/market/cart/finish/:id", (req, res) =>
	cartFinishShoppingRoute(req, res),
);
