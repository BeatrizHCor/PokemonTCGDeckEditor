import React, { useContext, useState } from "react";
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

const DeckList = () => {
    const [deckData, setDeckData] = useState<[TDeckDto] | undefined[]>();
    const loadDeck = useQuery(LOAD_DECKS);
    const deckList = async () => {
        setDeckData(loadDeck.data.loadUserDecks);
        await console.log(deckData);
    };

    return (
        <>
            <Card>
                <Button onClick={deckList}>Decks</Button>
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
                            {deckData?.map((deck) => (
                                <TableRow
                                    key={deck?.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell align="center">{deck?.name}</TableCell>
                                    <TableCell align="center">{deck?.id}</TableCell>
                                    <TableCell align="center">{deck?.cards.length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    );
};

export default DeckList;
