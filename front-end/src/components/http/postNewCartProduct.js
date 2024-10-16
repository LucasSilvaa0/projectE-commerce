import axios from "axios";

export default async function postCartProduct(array) {
    const jsonRequest = {
        cart_user_id: array[0],
        product_id: array[1]
    }

    const result = await axios.post('http://localhost:5000/market/cart/new_product', jsonRequest)

    return result.status
}