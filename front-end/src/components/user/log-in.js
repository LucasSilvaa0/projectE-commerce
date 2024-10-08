import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('')
  const [userpassword, setUserpassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {

      const usuario = {
          email,
          userpassword,
      }

      const response = await axios.post('http://localhost:5000/user/login', usuario)
      console.log(response.status)
        
    } catch (e) {
      window.alert("ERRO!")
      console.log(e)
    }
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
        <a href="http://localhost:3000/user/forgot_password">Esqueci a senha</a>
        <div className='log-botoes'>
          <button type='button' className='cadastrar' onClick={() => window.location.replace("http://localhost:3000/user/new_user")}>Cadastrar</button><div className='space-botoes'/><button type='submit' className='entrar'>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
