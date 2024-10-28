import axios from "axios"

export default async function getUserCart({queryKey}) {
    const response = await axios.get(`http://localhost:5000/market/cart/${queryKey[1]}`)

    console.log("OLHE AQUI O QUE TÁ RECEBENDO:")
    console.log(response.data)
    return response.data
}