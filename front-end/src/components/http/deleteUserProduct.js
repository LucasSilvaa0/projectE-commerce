import axios from "axios";

export default async function deleteUserProduct(id) {
    return await axios.delete(`http://localhost:5000/market/del_product/${id}`)
}