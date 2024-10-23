import axios from "axios"

export default async function putEditProduct(produto) {
    const jsonRequest = {
        product_id: produto.productId,
        new_name: produto.novoNome,
        new_description: produto.novaDescricao,
        new_price: Number(produto.novoPreco),
    }

    const response = await axios.put("http://localhost:5000/market/update_product", jsonRequest)

    return response.status
}