import axios from "axios";

export default async function getUserProducts({ queryKey }) {
    const { data } = await axios.get(`http://localhost:5000/market/myproducts/${queryKey[1]}`)

    return data
}