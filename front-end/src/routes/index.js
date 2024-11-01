import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "../components/user/sign-in"
import Signup from "../components/user/sign-up"
import Home from "../components/home"
import useAuth from "../hooks/useAuth"
import EsqueceuSenha from "../components/user/esqueceu-senha"
import UserProducts from "../components/market/userProducts"

const Private = ({ Item }) => {
    const { signed } = useAuth()

    return signed > 0 ? <Item /> : <Signin />
}

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home} />}/>
                    <Route exact path="/profile" element={<Private Item={UserProducts} />}/>
                    <Route exact path="/forgot_password" element={<EsqueceuSenha />}/>
                    <Route exact path="/signup" element={<Signup />}/>
                    <Route path="/" element={<Signin />}/>
                    <Route path="*" element={<Signin />}/>
                </Routes>
            </fragment>
        </BrowserRouter>
    )
}