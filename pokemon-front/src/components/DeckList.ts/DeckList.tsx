import React, { useContext, useEffect, useState } from "react";
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

import { useDeckLoad, useDeleteDeck } from "../../graphql/hooks/Deck";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import CatchingPokemon from "@mui/icons-material/CatchingPokemon";
import { DeleteForeverRounded } from "@mui/icons-material";
const DeckList = () => {
    const { decks, loading } = useDeckLoad();
    const navigate = useNavigate();
    const deleteDeck = useDeleteDeck();

    if (loading) {
        return <p>...loading</p>;
    }

    return (
        <>
            <Card>
                <h1>Deck List</h1>
                <TableContainer sx={{ maxHeight: 500, width: 1500 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">DeckName</TableCell>
                                <TableCell align="center">Deck Id</TableCell>
                                <TableCell align="center">Number of Cards</TableCell>
                                <TableCell align="center">Edit Deck</TableCell>
                                <TableCell align="center">Delete Deck</TableCell>
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
                                                onClick={() => navigate(`/deck?deckId=${deck?.id}`)}
                                                sx={{
                                                    color: "blue",
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
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/deck")}
                                sx={{ widht: "fit-content" }}>
                                Create new Deck
                            </Button>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    );
};

export default DeckList;
