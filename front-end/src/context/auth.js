import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const userToken = localStorage.getItem("user_token")
        
        setUser(userToken)
    }, [])

    const signin = (email, tokenId) => {
        localStorage.setItem("user_token", JSON.stringify({tokenId}))
        setUser({ email, tokenId: tokenId })
        return
    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem("user_token")
    }

    return (
        <AuthContext.Provider
            value={{user, signed: !!user, signin, signout}}
        >
            {children}
        </AuthContext.Provider>
    )
}