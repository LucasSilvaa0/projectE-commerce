import { useQuery } from "@tanstack/react-query";
import getUserProducts from "../http/getUserProducts";
import { useState } from "react";
import "./products.css"

export default function UserProducts() {
    const [tokenId, setTokenId] = useState(1)
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userProducts', tokenId],
        queryFn: getUserProducts,
        staleTime: 1000 * 60,
    })
  
    if (isLoading) {
      return <p>Carregando produtos...</p>;
    }
  
    if (isError) {
      return <p>Erro ao carregar os produtos: {error.message}</p>;
    }
  
    const BRreal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    return (
        <div className="perfil-page">
            <div className="perfil">
                <h1>perfil</h1>
            </div>
            <div className="user-produtos-container">
                {data.length? data.map((produto) => {
                    return (
                        <div key={produto.id} className="user-produto-card">
                            <div className="blocos-colunas"><img src={produto.photo_link} alt='imagem'/></div>
                            <div className="blocos-colunas"><br/><h2>{produto.product_name}</h2></div>
                            <div className="blocos-colunas"><br/><p>{produto.product_description}</p></div>
                            <div className="blocos-colunas"><br/><p className="preco">{BRreal.format(produto.product_price)}</p></div>
                        </div>
                    )
                }) : (
                    <p>Você ainda não tem produtos cadastrados.</p>
                )}
            </div>
        </div>
    )
   
  }