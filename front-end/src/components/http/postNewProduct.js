import axios from "axios"

export default async function postNewProduct(produto) {

    console.log(produto)

    const jsonRequest = {
        seller_id: produto.seller_id,
        product_name: produto.nome,
        product_description: produto.descricao,
        product_price: Number(produto.preco),
        photo_link: produto.imageUrl,
    }

    const response = await axios.post('http://localhost:5000/market/new_product', jsonRequest)

    return response
}