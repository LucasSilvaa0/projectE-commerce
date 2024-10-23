import { useQuery } from "@tanstack/react-query";
import getUserProducts from "../http/getUserProducts";
import putEditProduct from "../http/putEditProduct";
import { useState } from "react";
import "./products.css"
import Produto from "./product";

export default function UserProducts() {
    const [tokenId, setTokenId] = useState(1)
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userProducts', tokenId],
        queryFn: getUserProducts,
        staleTime: 1000 * 300,
    })

    async function handleSaveProduto(produto) {
        const retorno = await putEditProduct(produto)

        if (retorno === 200) {
            window.alert("Produto editado com sucesso!")
            window.location.reload()
        }
    }
  
    if (isLoading) {
      return <p>Carregando produtos...</p>;
    }
  
    if (isError) {
      return <p>Erro ao carregar os produtos: {error.message}</p>;
    }

    return (
        <div className="perfil-page">
            <div className="perfil">
                <img src="../perfil.png" alt="img_perfil" className="img_perfil"/>
                <button type="button" className="botao-adicionar"><strong>➕<br/>ADICIONAR PRODUTO NA LOJA<br/>➕</strong></button>
                <button type="button" className="botao-carrinho"><strong>🛒<br/>CARRINHO<br/>🛒</strong></button>
            </div>
            <div className="user-produtos-container">
                {data.length? data.map((produto) => {
                    return <Produto key={produto.id} produto={produto} onSave={handleSaveProduto}/>
                }) : (
                    <p>Você ainda não tem produtos cadastrados.</p>
                )}
            </div>
        </div>
    )
   
  }