import React, { useState } from 'react';
import axios from 'axios';

function Cadastro() {
  async function cadastrar() {
  }

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

      const response = await axios.post('http://localhost:5000/new_user', usuario)
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
        <label>Nome:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          name="userpassword"
          value={userpassword}
          onChange={(e) => setUserpassword(e.target.value)}
          required
        />

        <button type='submit' onClick={cadastrar}>Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
