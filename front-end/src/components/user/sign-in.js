import React, { useState } from 'react';
import postLogin from "../http/postLogin";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const { signin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [userpassword, setUserpassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await postLogin(email, userpassword)

        if (response.data === "Login incorreto.") {
            window.alert(response.data)
            return
        }
        
        signin(email, response.data[0].id)
        navigate("/home")
    };

    return (
        <div className="container">
            <h2>Entrada de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <label>E-mail:
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>

                <label>Senha:
                <input
                    type="password"
                    name="userpassword"
                    value={userpassword}
                    onChange={(e) => setUserpassword(e.target.value)}
                    required
                />
                </label><br/>
                <a href="http://localhost:3000/forgot_password">Esqueci a senha</a>
                <div className='log-botoes'>
                <button type='button' className='cadastrar' onClick={() => navigate("/signup")}>Cadastrar</button><div className='space-botoes'/><button type='submit' className='entrar'>Entrar</button>
                </div>
            </form>
        </div>
    ); 
}