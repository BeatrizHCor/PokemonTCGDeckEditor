import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    const now = Date.now;

    useEffect(() => {
        const storageToken = localStorage.getItem(TOKEN_NAME);

        setTokenState(storageToken || "");
        if (location.pathname !== "/") {
            if (!token) {
                return navigate("/");
            }
            const isTokenExpired = false;
            if (isTokenExpired) {
                window.localStorage.removeItem(TOKEN_NAME);
                setToken("");
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
