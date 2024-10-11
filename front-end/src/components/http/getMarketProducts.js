import axios from "axios"

export default async function getMarketProducts() {
    const { data } = await axios.get('http://localhost:5000/market/products') 
    
    return data
}