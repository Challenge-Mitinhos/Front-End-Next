"use client";

import { createContext, useState } from "react";

type LoginContextType = {
    login: "logado" | "deslogado",
    toggleLogin:()=>void;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginProviderProps {
    children: React.ReactNode;
}

export const LoginProvider = ({children}:LoginProviderProps) => {
    const [login, setLogin] = useState<"logado"|"deslogado">("deslogado")

    const toggleLogin = () => {
        setLogin(login === "deslogado"? "logado":"deslogado")
    }

    return <LoginContext.Provider value={{login, toggleLogin}}>{children}</LoginContext.Provider>
}