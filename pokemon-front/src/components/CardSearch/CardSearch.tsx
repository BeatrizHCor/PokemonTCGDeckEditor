import React, { useState } from "react";
import { Button, Card, Container, Input, TextField } from "@mui/material/";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import useToggle from "../../hooks/useToggle";
import { Box, minWidth } from "@mui/system";

const INITIAL_STATE: PokemonTCG.Card[] = [];

const CardSearch = () => {
    const [cardSearch, setCardSearch] = useState("");
    const [cardData, setCardData] = useState<PokemonTCG.Card[]>(INITIAL_STATE);
    const [currentDeck, setCurrentDeck] = useState<PokemonTCG.Card[]>(INITIAL_STATE);

    const findByName = async () => {
        const cards = await PokemonTCG.findCardsByQueries({ q: `name:*${cardSearch}*` });
        setCardData(cards);
    };

    const addCardtoDeck = async (cardid: string) => {
        const cardstoDeck = await PokemonTCG.findCardByID(`${cardid}`);
        setCurrentDeck([...currentDeck, cardstoDeck]);
    };

    return (
        <Box sx={{ marginLeft: 5, marginTop: 10 }}>
            <Container
                sx={{
                    display: "flex",
                    overflow: "auto",
                    margin: 1,
                    maxheight: 700,
                    minHeight: 350,
                    width: 1500,
                }}>
                {currentDeck.map((card) => (
                    <Container
                        sx={{
                            margin: 1,
                            cursor: "pointer",
                        }}
                        key={card.id}>
                        <img src={card.images.small}></img>
                    </Container>
                ))}
            </Container>

            <Card sx={{ bottom: 0, right: 0 }}>
                <TextField
                    placeholder="Card Name"
                    onChange={(e) => setCardSearch(e.target.value)}
                />
                <Button
                    sx={{ margin: 5, backgroundColor: "#FB1B1B", color: "#FFFFFF" }}
                    onClick={findByName}>
                    Search
                </Button>
            </Card>
            <Container>
                <Card
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        overflowX: "auto",
                        overflowY: "hidden",
                    }}>
                    {cardData.map((card) => (
                        <Container key={card.id}>
                            <img
                                src={card.images.small}
                                onClick={() => addCardtoDeck(card.id)}></img>
                            <p>{card.name}</p>
                        </Container>
                    ))}
                </Card>
            </Container>
        </Box>
    );
};
export default CardSearch;
