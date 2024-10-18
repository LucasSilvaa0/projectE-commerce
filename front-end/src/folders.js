import Cadastro from "./components/user/sign-up";
import EsqueceuSenha from "./components/user/esqueceu-senha";
import Home from "./components/home";
import UserProducts from "./components/market/userProducts"

export default function Folders() {

    function inicio() {
        window.location.replace("http://localhost:3000/")
    }
    
    const vallink = window.location

    let pagina
    if (`${vallink}` === "http://localhost:3000/user/new_user") {
        pagina = <Cadastro />
    } else if (`${vallink}` === "http://localhost:3000/") {
        pagina = <Home/>
    } else if (`${vallink}` === "http://localhost:3000/user/forgot_password") {
        pagina = <EsqueceuSenha />
    } else if (`${vallink}` === "http://localhost:3000/market/myproducts") {
        pagina = <UserProducts />
    } else {
        inicio()
    }

    return (
        <div>
            {pagina}
        </div>
    )
}