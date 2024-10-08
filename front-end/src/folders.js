import Cadastro from "./components/user/sign-up";
import Login from "./components/user/log-in";
import EsqueceuSenha from "./components/user/esqueceu-senha";

export default function Folders() {

    function inicio() {
        window.location.replace("http://localhost:3000/user/login")
    }
    
    const vallink = window.location

    let pagina
    if (`${vallink}` === "http://localhost:3000/user/new_user") {
        pagina = <Cadastro />
    } else if (`${vallink}` === "http://localhost:3000/user/login") {
        pagina = <Login/>
    } else if (`${vallink}` === "http://localhost:3000/user/forgot_password") {
        pagina = <EsqueceuSenha />
    } else {
        inicio()
    }

    return (
        <div>
            {pagina}
        </div>
    )
}