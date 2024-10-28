import { useQuery } from "@tanstack/react-query";
import getUserProducts from "../http/getUserProducts";
import putEditProduct from "../http/putEditProduct";
import { useState } from "react";
import "./products.css"
import Produto from "./product";
import axios from "axios"
import postNewProduct from "../http/postNewProduct";
import getUserCart from "../http/getUserCart";
import deleteCartProduct from "../http/deleteCartProduct";
import getFinishShopping from "../http/getFinishShopping";

const uploadPreset = process.env.REACT_APP_CLOUD_UPLOAD_PRESET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

export default function UserProducts() {
    const [tokenId, setTokenId] = useState(9)
    const [creatingNewProduct, setCreatingNewProduct] = useState(false)
    const [showingCart, setShowingCart] = useState(false)
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userProducts', tokenId],
        queryFn: getUserProducts,
        staleTime: 1000 * 300,
    })


    const data2 = useQuery({
        queryKey: ['userCart', tokenId],
        queryFn: getUserCart,
        staleTime: 1000 * 300,
    })
    const produtosCarrinho = data2.data

    async function handleUpdateProduct(produto) {
        const retorno = await putEditProduct(produto)

        if (retorno === 200) {
            window.alert("Produto editado com sucesso!")
            window.location.reload()
        }
    }
  
    function novoProduto() {
        if (showingCart) setShowingCart(false)
        setCreatingNewProduct(!creatingNewProduct)
    }

    function verCarrinho() {
        if (creatingNewProduct) setCreatingNewProduct(false)
        setShowingCart(!showingCart)
    }

    function ShowUserProducts() {
        if (creatingNewProduct || showingCart) return null

        return (
            <div className="user-produtos-container">
                {data.products.length? data.products.map((produto) => {
                    return <Produto key={produto.id} produto={produto} onSave={handleUpdateProduct}/>
                }) : (
                    <h1 className="sem-produtos">Você ainda não tem produtos cadastrados.</h1>
                )}
            </div>
        )
    }

    function FormNewProduct() {
        const [nome, setNome] = useState('')
        const [descricao, setDescricao] = useState('')
        const [preco, setPreco] = useState('')
        const [foto, setFoto] = useState('')

        const handleNomeChange = (event) => setNome(event.target.value)
        const handleDescricaoChange = (event) => setDescricao(event.target.value)
        const handlePrecoChange = (event) => setPreco(event.target.value)
        const handleFotoChange = (event) => setFoto(event.target.files[0])

        async function handleSubmit(event) {
            event.preventDefault()

            try {
                // Enviar a imagem para o Cloudinary

                const formData = new FormData();
                formData.append("file", foto);
                formData.append("upload_preset", uploadPreset);

                const responseCloundinary = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formData
                );
            
                const imageUrl = responseCloundinary.data.secure_url;
                console.log("A URL DA IMAGEM É ESSA: ", imageUrl)
                
                const response = await postNewProduct({
                    seller_id: tokenId,
                    nome,
                    descricao,
                    preco,
                    imageUrl
                })
                
                console.log(response)
                if (response.status === 200) {
                    setCreatingNewProduct(!creatingNewProduct)
                    window.location.reload()
                }
            } catch (error) {
                console.error("Erro ao carregar a imagem:", error);
                alert("Erro ao carregar a imagem");
            }
        }

        if (creatingNewProduct === false) return null

        return (
            <div className="formulario-novo-produto">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nome">Nome do Produto:</label>
                        <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={handleNomeChange}
                        placeholder="Nome do produto"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="preco">Preço:</label>
                        <input
                        type="number"
                        id="preco"
                        value={preco}
                        onChange={handlePrecoChange}
                        placeholder="Preço do produto"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea
                        id="descricao"
                        value={descricao}
                        onChange={handleDescricaoChange}
                        placeholder="Descrição do produto"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="foto">Foto:</label>
                        <input
                        type="file"
                        id="foto"
                        onChange={handleFotoChange}
                        accept="image/*"
                        required
                        />
                    </div><br/>
                    <div>
                        <button type="submit" className="botao-novo-produto">Cadastrar Produto</button>
                    </div>
                </form>
            </div>
        )
    }

    function Carrinho() {
        const [precoTotal, setPrecoTotal] = useState(0);

        if (precoTotal === 0 && produtosCarrinho.length > 0) {
            let soma = 0
            for (let i = 0; i < produtosCarrinho.length; i++) {
                soma += produtosCarrinho[i].product_price
            }
            console.log(soma)
            setPrecoTotal(soma)
        }
        
        if (!showingCart) return null
        
        // Função para finalizar a compra
        const finalizarCompra = async () => {
            const resposta = window.prompt('TEM CERTEZA QUE DESEJA FINALIZAR A COMPRA? (a compra só será realizada se a resposta for "SIM")')
            if (resposta !== "SIM") return null

            const response = await getFinishShopping(tokenId)

            if (response.status === 200) {
                console.log(response)
                window.alert("COMPRA FINALIZADA COM SUCESSO!")
                window.location.reload()
            };
        };

        const BRreal = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })

        async function removeCartProduct(id) {
            const response = await deleteCartProduct(id)

            if (response.status === 200) return window.location.reload()
        }
        
        return (
            <div className="tabela-carrinho" style={{ padding: '20px' }}>
                <h1>Carrinho de Compras</h1>
        
                {produtosCarrinho.length === 0 ? (
                    <p>O carrinho está vazio</p>
                ) : (
                    <div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}><strong>Produto</strong></th>
                                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}><strong>Preço</strong></th>
                                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}><strong>Foto</strong></th>
                                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}><strong>Vendedor</strong></th>
                                    <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtosCarrinho.map((produto) => (
                                    <tr key={produto.id}>
                                        <td style={{ padding: '8px' }}>{produto.product_name}</td>
                                        <td style={{ padding: '8px' }}>{BRreal.format(produto.product_price)}</td>
                                        <td style={{ padding: '8px' }}><img src={produto.photo_link} alt='imagem'/></td>
                                        <td style={{ padding: '8px' }}>{produto.product_seller}</td>
                                        <td style={{ padding: '8px' }}><button type="button" className="botao-excluir" onClick={() => removeCartProduct(produto.id)}>REMOVER PRODUTO DO CARRINHO</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h3>{BRreal.format(precoTotal)}</h3>

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

    if (isLoading) {
      return <p>Carregando produtos...</p>;
    }
  
    if (isError) {
      return <p>Erro ao carregar os produtos: {error.message}</p>;
    }

    console.log(data)

    return (
        <div className="perfil-page">
            <div className="perfil">
                <img src="../perfil.png" alt="img_perfil" className="img_perfil"/>
                <h2 className="username">{data.user.username}</h2>
                {creatingNewProduct? <button type="button" className="botao-adicionar" onClick={novoProduto}><strong>↩️<br/>VOLTAR PARA PERFIL<br/></strong>↩️</button> : <button type="button" className="botao-adicionar" onClick={novoProduto}><strong>➕<br/>ADICIONAR PRODUTO NA LOJA<br/>➕</strong></button> }
                {showingCart? <button type="button" className="botao-carrinho" onClick={verCarrinho}><strong>↩️<br/>VOLTAR PARA PERFIL<br/></strong>↩️</button> : <button type="button" className="botao-carrinho" onClick={verCarrinho}><strong>➕<br/>CARRINHO<br/>➕</strong></button> }
            </div>

            <ShowUserProducts />
            
            <FormNewProduct />

            <Carrinho />
        </div>
    )
   
  }