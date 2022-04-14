import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Uso de Context Provider para salvar e ultilizar os JWT pelo Client

interface IAuthContext {
    token?: string;
    setToken: (input: string) => void;
}

const TOKEN_NAME = "loginToken";

export const AuthContext = createContext<IAuthContext>({
    setToken: () => {},
});

interface IProps {
    children: ReactNode;
}

const AuthContextProvider = (props: IProps) => {
    const [token, setTokenState] = useState("");
    const setToken = (tokenInput: string) => {
        localStorage.setItem(TOKEN_NAME, tokenInput);
        setTokenState(tokenInput);
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storageToken = localStorage.getItem(TOKEN_NAME) || token;

        setTokenState(storageToken || "");
        if (location.pathname !== "/") {
            if (!storageToken) {
                return navigate("/");
            }
        }
    }, [token]);

    const authContextValue = useMemo<IAuthContext>(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
