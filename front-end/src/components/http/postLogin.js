import axios from "axios"

export default async function postLogin(email, userpassword) {
    const jsonRequest = {
        email,
        userpassword,
    }

    const response = await axios.post('http://localhost:5000/user/login', jsonRequest)

    return response
}