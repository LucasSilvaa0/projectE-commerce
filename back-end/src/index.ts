import express from 'express';
import { NewUser } from "./models";
import { searchUser } from './functions';

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

    const result1 = NewUser.safeParse(newUserScheme);
    if (result1.success) {
        console.log("Validação bem-sucedida:", result1.data);
        searchUser(newUserScheme, res, 0)
    } else {
        console.log("Erro de validação:", result1.error.errors);
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