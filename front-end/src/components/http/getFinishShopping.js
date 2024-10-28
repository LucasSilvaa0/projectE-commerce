import axios from "axios"

export default async function getFinishShopping(id) {
    const response = await axios.get(`http://localhost:5000/market/cart/finish/${id}`)
    
    return response
}