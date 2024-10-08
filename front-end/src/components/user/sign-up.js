import React, { useState } from 'react';
import axios from 'axios';

function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [userpassword, setUserpassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {

      const usuario = {
          username,
          email,
          userpassword,
      }

      const response = await axios.post('http://localhost:5000/user/new_user', usuario)
      console.log(response.status)
        
    } catch (e) {
      window.alert("ERRO!")
      console.log(e)
    }
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

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
        </label>
        <div className='log-botoes'>
          <button type='submit' className='cadastrar'>Cadastrar</button><div className='space-botoes'/><button type='submit' className='entrar' onClick={() => window.location.replace("http://localhost:3000/user/login")}>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
