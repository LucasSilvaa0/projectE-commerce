import express from 'express';
import { UserModel, MarketProductModel } from "./models";
import { showProducts, offerProduct, searchUser } from './functions';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


app.post('/', (req, res) => {
    console.log("Alguém entrou no servidor! ")

    let corpo:JSON = req.body

    res.send(corpo)
});

app.post('/new_user', (req, res) => {
    console.log("Alguém está tentanto criar um novo usuário! ")

    const newUserScheme = req.body

    const result = UserModel.safeParse(newUserScheme);
    if (result.success) {
        console.log("Validação bem-sucedida:", result.data);
        searchUser(newUserScheme, res, 0)
    } else {
        console.log("Erro de validação:", result.error.errors);
    }
    
});

app.post('/forgot_password', (req, res) => {
    console.log("Alguém está querendo lembrar da senha. ")

    const userEmail = req.body

    searchUser(userEmail, res, 1)
});

app.post('/login', (req, res) => {
    console.log("Alguém está querendo logar a conta.")

    const user = req.body

    searchUser(user, res, 2)
});

app.post('/market/new_product', (req, res) => {
    console.log("Tem alguém querendo oferecer um novo produto.")

    const newProductScheme = req.body

    const result = MarketProductModel.safeParse(newProductScheme)

    console.log(result)

    if (result.success) {
        offerProduct(newProductScheme, res)
    }
})

app.get('/market/products', (req, res) => {
    console.log("Alguém está querendo dar uma olhada na loja.")

    showProducts(res, 0)
})

app.get(`/market/myproducts/:userId`, (req, res) => {
    console.log("Alguém está querendo ver seus próprios produtos.")

    const userId = req.params.userId

    showProducts(res, 0, userId)
})