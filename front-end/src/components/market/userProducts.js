import { useQuery } from "@tanstack/react-query";
import getUserProducts from "../http/getUserProducts";
import putEditProduct from "../http/putEditProduct";
import { useState } from "react";
import "./products.css"
import Produto from "./product";
import axios from "axios"
import { postNewProduct } from "../http/postNewProduct";

const uploadPreset = process.env.REACT_APP_CLOUD_UPLOAD_PRESET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

export default function UserProducts() {
    const [tokenId, setTokenId] = useState(9)
    const [creatingNewProduct, setCreatingNewProduct] = useState(false)
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userProducts', tokenId],
        queryFn: getUserProducts,
        staleTime: 1000 * 300,
    })

    async function handleUpdateProduct(produto) {
        const retorno = await putEditProduct(produto)

        if (retorno === 200) {
            window.alert("Produto editado com sucesso!")
            window.location.reload()
        }
    }
  
    function novoProduto() {
        setCreatingNewProduct(!creatingNewProduct)
    }

    function ShowUserProducts() {
        if (creatingNewProduct === true) return null

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
                <button type="button" className="botao-carrinho"><strong>🛒<br/>CARRINHO<br/>🛒</strong></button>
            </div>

            <ShowUserProducts />
            
            <FormNewProduct />
        </div>
    )
   
  }