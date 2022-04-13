import React, { useState } from "react";
import { Button, Card, Container, TextField } from "@mui/material/";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Box } from "@mui/system";
import { useDeckLoadOne, useSaveDeck, useUpdateDeck } from "../../graphql/hooks/Deck";
import { TDeckUpdateInput } from "../../generated";
import { useParams, useSearchParams } from "react-router-dom";

const INITIAL_STATE: PokemonTCG.Card[] = [];
const INITIAL_SAVE_STATE = {
    id: -1,
    cards: [],
};

const CardSearch = () => {
    const [deckId] = useSearchParams();
    const [cardSearch, setCardSearch] = useState("");
    const [cardData, setCardData] = useState<PokemonTCG.Card[]>(INITIAL_STATE);
    const [currentDeck, setCurrentDeck] = useState<PokemonTCG.Card[]>(INITIAL_STATE);
    const updateDeck = useUpdateDeck();
    const saveDeck = useSaveDeck();
    const [input, setInput] = useState<TDeckUpdateInput>(INITIAL_SAVE_STATE);
    const deckLength = currentDeck.length;
    const { deckLoad, loading, error } = useDeckLoadOne(Number(deckId.get("deckId")));

    if (loading) {
        return <p>...loading</p>;
    }

    const defineDeck = async () => {
        if (!deckLoad) {
            return;
        }
        const deckCardsMap = deckLoad.cards.map((cardId) => PokemonTCG.findCardByID(`${cardId}`));
        const deckCards = await Promise.all<PokemonTCG.Card>(deckCardsMap);
        setCurrentDeck(deckCards);
    };

    if (deckLoad) {
        defineDeck();
    }

    const findByName = async () => {
        const cards = await PokemonTCG.findCardsByQueries({ q: `name:*${cardSearch}*` });
        setCardData(cards);
    };

    const addCardtoDeck = async (cardid: string) => {
        const cardstoDeck = await PokemonTCG.findCardByID(`${cardid}`);
        setCurrentDeck([...currentDeck, cardstoDeck]);
    };
    const saveDeckButton = async () => {
        saveDeck({
            name: input.name || "",
            cards: currentDeck.map((it) => it.id),
        });
    };

    const updateDeckButton = async () => {
        updateDeck({
            name: input.name || "",
            cards: currentDeck.map((it) => it.id),
            id: Number(deckId.get("deckId")),
        });
    };

    const inputSaveDeck = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        inputType: keyof TDeckUpdateInput
    ) => {
        setInput({ ...input, [inputType]: e.target.value });
    };

    const generateRandomDeck = async () => {
        const allCards = await PokemonTCG.getAllCards();
        let i = deckLength;
        while (i < 60) {
            const randomCardtoDeck = allCards[Math.floor(Math.random() * [allCards].length)];
            if (currentDeck.includes(randomCardtoDeck)) {
                return null;
            } else {
                addCardtoDeck(randomCardtoDeck.id);
                i++;
            }
        }
    };

    return (
        <Box sx={{ marginLeft: 5, marginTop: 10, overflow: "auto" }}>
            <p>Deck Name</p>
            <TextField
                sx={{ margin: 1 }}
                variant="outlined"
                type="text"
                name="Deck Name"
                label="Deck Name"
                value={input.name}
                onChange={(event) => inputSaveDeck(event, "name")}
            />
            <Card
                sx={{
                    display: "flex",
                    overflow: "auto",
                    margin: 1,
                    maxheight: 700,
                    minHeight: 350,
                    width: 1000,
                    flexWrap: "wrap",
                }}>
                {currentDeck.map((card) => (
                    <Container
                        sx={{
                            margin: 1,
                            cursor: "pointer",
                            width: "fit-content",
                            overflow: "auto",
                        }}
                        key={card.id}>
                        <img src={card.images.small}></img>
                    </Container>
                ))}
            </Card>
            <Button onClick={saveDeckButton}>Save Deck</Button>
            <Button onClick={updateDeckButton}>Save as new Deck</Button>
            <Button onClick={generateRandomDeck}>Generate Random Deck</Button>
            <Button onClick={() => setCurrentDeck(INITIAL_STATE)}>Delete All</Button>
            <Button>Reset Deck</Button>
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
                        columnGap: 4,
                    }}>
                    {cardData.map((card) => (
                        <Container
                            key={card.id}
                            sx={{ minWidth: 490, height: 684, cursor: "pointer" }}>
                            <img
                                src={card.images.small}
                                style={{
                                    maxWidth: 490,
                                    maxHeight: 684,
                                }}
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
