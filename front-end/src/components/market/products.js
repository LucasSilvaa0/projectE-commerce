import React from 'react';
import './products.css';
import { useQuery } from '@tanstack/react-query'
import getMarketProducts from '../http/getMarketProducts';
import postCartProduct from '../http/postNewCartProduct';


function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getMarketProducts,
    staleTime: 1000 * 60,
  })

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
    // Aqui você pode redirecionar para a página de perfil ou abrir uma aba lateral.
    window.alert('Abrindo aba de perfil...');
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
              <button type='button' className="cart-button" onClick={() => newCartProduct([1, produto.id])}>Adicionar ao carrinho</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Products;