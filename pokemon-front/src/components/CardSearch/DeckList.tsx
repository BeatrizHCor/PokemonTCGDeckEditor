import React, { useContext, useEffect, useState } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useDeckLoad } from "../../graphql/hooks/Deck";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { TDeckDto, TQuery } from "../../generated";
import { LOAD_DECKS } from "../../graphql/queries/Deck";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const DeckList = () => {
    const { token } = useContext(AuthContext);
    const [deckData, setDeckData] = useState<[TDeckDto] | undefined[]>();
    const { decks, loading } = useDeckLoad();
    const navigate = useNavigate();

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
                                    <TableCell align="right">EditButton</TableCell>
                                    <TableCell align="right">DeleteButton</TableCell>
                                </TableRow>
                            ))}
                            <Button variant="outlined" onClick={() => navigate("/deck")}>
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
