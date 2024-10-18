import React, { useState } from 'react';
import './market/products.css';
import { useQuery } from '@tanstack/react-query'
import getMarketProducts from './http/getMarketProducts';
import postCartProduct from './http/postNewCartProduct';
import axios from "axios"


function Home() {
  const [email, setEmail] = useState('')
  const [userpassword, setUserpassword] = useState('')
  
  const [loggedIn, setLoggedIn] = useState(false)
  const [tokenId, setTokenId] = useState('')
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getMarketProducts,
    staleTime: 1000 * 60,
  })

  if (!loggedIn) {

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {

        const usuario = {
            email,
            userpassword,
        }

        const response = await axios.post('http://localhost:5000/user/login', usuario)

        if (response.data === "Esse email não está cadastrado.") {
            window.alert(response.data)
        } else {
            setTokenId(response.data[0].id)
            setLoggedIn(true)
        }
            
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

  if (isLoading) {
    return <p>Carregando produtos...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar produtos: {error.message}</p>;
  }

  const newCartProduct = async (productId) => {
    const retorno = await postCartProduct(productId)
    if (retorno === 200) window.alert("Produto adicionado ao carrinho com sucesso!")
  }

  const handlePerfilClick = () => {
    window.location.replace("http://localhost:3000/market/myproducts");
  };

  const BRreal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="loja-container">
      <header className="loja-header">
        <h1>Loja de Comércio Eletrônico</h1>
        <button type='button' className="perfil-button" onClick={handlePerfilClick}>
          Perfil
        </button>
      </header>

      <div className="produtos-container">
        {data.map((produto) => {
          return (
            <div key={produto.id} className="produto-card">
              <img src={produto.photo_link} alt='imagem'/>
              <h2>{produto.product_name}</h2>
              <p>{produto.product_description}</p>
              <p className="preco">{BRreal.format(produto.product_price)}</p>
              <button type='button' className="cart-button" onClick={() => newCartProduct([tokenId, produto.id])}>Adicionar ao carrinho</button>
            </div>
          )
        })}
      </div>
    </div>
  );

}

export default Home;