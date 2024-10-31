import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function EsqueceuSenha() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
    
          const usuario = {
              email,
          }
    
          const response = await axios.post('http://localhost:5000/user/forgot_password', usuario)
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
            <button type="submit" className="enviar-senha">ENVIAR SENHA PARA O EMAIL</button>
            <div className='log-botoes'>
              <button type='button' className='cadastrar' onClick={() => navigate("/signup")}>Cadastrar</button><div className='space-botoes'/><button type='button' className='entrar'>Entrar</button>
            </div>
          </form>
        </div>
      );
}