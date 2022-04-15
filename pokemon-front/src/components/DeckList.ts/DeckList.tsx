import React from "react";
import {
    Button,
    Card,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

// Tabela ultilizando MUI para carregar a relação de Decks do Usuário

import { useDeckLoad, useDeleteDeck, useSaveDeck } from "../../graphql/hooks/Deck";
import { useNavigate } from "react-router-dom";
import CatchingPokemon from "@mui/icons-material/CatchingPokemon";
import { DeleteForeverRounded } from "@mui/icons-material";
const DeckList = () => {
    const { decks } = useDeckLoad();
    const navigate = useNavigate();
    const deleteDeck = useDeleteDeck();
    const saveDeck = useSaveDeck();

    const createNewDeck = () => {
        saveDeck({
            cards: [],
            name: "Novo Deck",
        }).then((result) => {
            navigate(`/deck?deckId=${result.data.createDeck.id}`);
        });
    };

    return (
        <>
            <Card sx={{ marginTop: 15 }}>
                <Card
                    sx={{
                        color: "#ffffff",
                        backgroundColor: "#0075BE",
                        height: 30,
                        fontSize: 30,
                        padding: "1rem 0",
                    }}>
                    Decks Salvos
                </Card>
                <TableContainer sx={{ height: 500, width: 1500 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Numero de Cartas</TableCell>
                                <TableCell align="center">Editar</TableCell>
                                <TableCell align="center">Deletar Deck</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {decks?.map((deck) => (
                                <TableRow
                                    key={deck?.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="center">{deck?.name}</TableCell>
                                    <TableCell align="center">{deck?.id}</TableCell>
                                    <TableCell align="center">{deck?.cards.length}</TableCell>
                                    <TableCell align="center">
                                        <Container>
                                            <CatchingPokemon
                                                onClick={() => navigate(`/deck?deckId=${deck.id}`)}
                                                sx={{
                                                    color: " #D5A100",
                                                    cursor: "pointer",
                                                }}></CatchingPokemon>
                                        </Container>
                                    </TableCell>
                                    <TableCell align="center">
                                        <DeleteForeverRounded
                                            onClick={() => deleteDeck(deck.id)}
                                            sx={{ color: "black", cursor: "pointer" }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    onClick={createNewDeck}
                    sx={{
                        widht: "fit-content",
                        color: "#ffffff",
                        backgroundColor: "#0075BE",
                        marginBottom: "1rem",
                    }}>
                    Criar Novo Deck
                </Button>
            </Card>
        </>
    );
};

export default DeckList;
