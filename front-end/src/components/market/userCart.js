import "products.css"
import React, { useState, useEffect } from 'react';

function Carrinho() {
  const [produtos, setProdutos] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);

  // Função para calcular o preço total do carrinho
  const calcularPrecoTotal = (produtos) => {
    const total = produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
    setPrecoTotal(total);
  };

  // Função para finalizar a compra
  const finalizarCompra = () => {
    alert("Compra finalizada com sucesso!");
    // Aqui você pode adicionar a lógica para processar a compra, enviar dados para uma API, etc.
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrinho de Compras</h1>

      {produtos.length === 0 ? (
        <p>O carrinho está vazio</p>
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Produto</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Preço</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Quantidade</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td style={{ padding: '8px' }}>{produto.nome}</td>
                  <td style={{ padding: '8px' }}>R$ {produto.preco.toFixed(2)}</td>
                  <td style={{ padding: '8px' }}>{produto.quantidade}</td>
                  <td style={{ padding: '8px' }}>R$ {(produto.preco * produto.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total: R$ {precoTotal.toFixed(2)}</h3>

          <button 
            type='button'
            onClick={finalizarCompra} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
