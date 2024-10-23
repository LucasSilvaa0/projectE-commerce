import React, { useState } from 'react';
import deleteUserProduct from "../http/deleteUserProduct"
import "./products.css"

function Produto({ produto, onSave }) {
  const [isEditing, setIsEditing] = useState(false); // Estado para controle do modo de edição
  const productId = produto.id
  const [novoNome, setNovoNome] = useState(produto.product_name);
  const [novaDescricao, setNovaDescricao] = useState(produto.product_description)
  const [novoPreco, setNovoPreco] = useState(produto.product_price);

    async function excluirItem(id) {
        const confirmacao = window.prompt("Tem certeza que deseja EXCLUIR o produto? (só será excluído se a resposta for 'SIM')")

        if (confirmacao === 'SIM') {
            const retorno = await deleteUserProduct(id)
            
            if (retorno.status === 200) {
                window.alert("Produto deletado com sucesso!")
                window.location.reload()
            }
        }
    }

  // Função para alternar entre visualização e edição
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Função para salvar as alterações
  const handleSave = () => {
    onSave({ productId, novoNome, novaDescricao, novoPreco }); // Chama a função onSave passada como prop
    setIsEditing(false); // Sai do modo de edição
  };
  
    const BRreal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

  return (
    <div>
        {isEditing ? (
            // Formulário de edição
            <div key={produto.id} id={produto.id} className="user-produto-card">
                <div className="blocos-colunas"><img src={produto.photo_link} alt='imagem'/></div>
                <input 
                    type="text" 
                    value={novoNome} 
                    onChange={(e) => setNovoNome(e.target.value)} 
                    placeholder="Nome do produto"
                    className="blocos-colunas"
                />
                <input 
                    type="text" 
                    value={novaDescricao} 
                    onChange={(e) => setNovaDescricao(e.target.value)} 
                    placeholder="Descrição do produto"
                    className="blocos-colunas"
                />
                <input 
                    type="number" 
                    value={novoPreco} 
                    onChange={(e) => setNovoPreco(e.target.value)} 
                    placeholder="Preço do produto"
                    className="blocos-colunas"
                />
                <div className="blocos-colunas">
                    <button type="submit" onClick={handleSave} className="botao-salvar">Salvar ✅</button><br/><br/><br/>
                    <button type="button" onClick={toggleEdit} className="botao-excluir">Cancelar ↩️</button>
                </div>
            </div>
        ) : (
            <div key={produto.id} id={produto.id} className="user-produto-card">
                <div className="blocos-colunas"><img src={produto.photo_link} alt='imagem'/></div>
                <div className="blocos-colunas"><br/><h2>{produto.product_name}</h2></div>
                <div className="blocos-colunas"><br/><p>{produto.product_description}</p></div>
                <div className="blocos-colunas"><br/><p className="preco">{BRreal.format(produto.product_price)}</p></div>
                <div className="blocos-colunas"><br/>
                    <button type="button" className="botao-editar" onClick={() => toggleEdit(produto.id)}>Editar item ✏️</button><br/><br/><br/>
                    <button type="button" className="botao-excluir" onClick={() => excluirItem(produto.id)}>Excluir item ❌</button>
                </div>
            </div>
        )}
    </div>
  );
}

export default Produto;
