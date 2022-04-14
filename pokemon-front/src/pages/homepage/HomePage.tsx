import React from "react";
import DeckList from "../../components/DeckList.ts/DeckList";
import Header from "../../components/Header/Header";

// Página de Visualização de Decks Salvos com Cabeçalho

const HomePage = () => {
    return (
        <>
            <Header />
            <DeckList />
        </>
    );
};

export default HomePage;
