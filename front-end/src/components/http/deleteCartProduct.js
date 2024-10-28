import axios from "axios"

export default async function deleteCartProduct(id) {
    const response = await axios.delete(`http://localhost:5000/market/cart/del_product/${id}`)

    return response
}