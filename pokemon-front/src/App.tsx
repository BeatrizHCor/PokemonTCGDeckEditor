import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./contexts/AuthContextProvider";
import DeckEdit from "./pages/deckeditor/DeckEditor";
import HomePage from "./pages/homepage/HomePage";
import LoginForm from "./pages/login/LoginPage";

const App = () => {
    const { token } = useContext(AuthContext);

    const client = new ApolloClient({
        uri: "http://localhost:4000",
        cache: new InMemoryCache(),
        headers: {
            Authorization: token || "",
        },
    });
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/deck" element={<DeckEdit />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </div>
        </ApolloProvider>
    );
};

export default App;
