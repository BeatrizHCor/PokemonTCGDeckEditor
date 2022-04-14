import React, { useEffect, useState } from "react";
import { Button, Card, Container, TextField } from "@mui/material/";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Box } from "@mui/system";
import { useDeckLoadOne, useSaveDeck, useUpdateDeck } from "../../graphql/hooks/Deck";
import { TDeckUpdateInput } from "../../generated";
import { useSearchParams } from "react-router-dom";
import { useRandomCard } from "../../graphql/hooks/Cards";

const INITIAL_STATE: PokemonTCG.Card[] = [];
const INITIAL_SAVE_STATE = {
    id: -1,
    cards: [],
};

const DeckEditor = () => {
    const [deckId] = useSearchParams();
    const [cardSearch, setCardSearch] = useState("");
    const [cardData, setCardData] = useState<PokemonTCG.Card[]>(INITIAL_STATE);
    const [currentDeck, setCurrentDeck] = useState<PokemonTCG.Card[]>(INITIAL_STATE);
    const updateDeck = useUpdateDeck();
    const saveDeck = useSaveDeck();
    const [input, setInput] = useState<TDeckUpdateInput>(INITIAL_SAVE_STATE);
    const { deckLoad, loading } = useDeckLoadOne(Number(deckId.get("deckId")));
    const [generatingRNDCards, setGeneratingRNDCards] = useState(false);
    const { randomCards } = useRandomCard(generatingRNDCards);

    const defineDeck = async (cardIds: string[]) => {
        if (cardIds.length === 0) {
            return;
        }
        const deckCardsMap = cardIds.map((cardId) => `id:${cardId}`);
        const deckCards = await PokemonTCG.findCardsByQueries({
            q: `(${deckCardsMap.join(" OR ")})`,
        });
        setCurrentDeck(deckCards);
    };

    const findByName = async () => {
        const cards = await PokemonTCG.findCardsByQueries({ q: `name:*${cardSearch}*` });
        setCardData(cards);
    };

    const addCardtoDeck = async (cardid: string) => {
        const cardstoDeck = await PokemonTCG.findCardByID(`${cardid}`);
        if (currentDeck.includes(cardstoDeck)) {
            return null;
        }
        setCurrentDeck([...currentDeck, cardstoDeck]);
    };
    const removeCardfromDeck = async (card: PokemonTCG.Card) => {
        let i = currentDeck.indexOf(card);
        const ii = i--;
        const currentDeckCopy = [...currentDeck];
        currentDeckCopy.splice(ii, 1);
        setCurrentDeck(currentDeckCopy);
    };
    const saveDeckButton = async () => {
        saveDeck({
            name: input.name || "",
            cards: currentDeck.map((it) => it.id),
        });
    };

    const updateDeckButton = async () => {
        updateDeck({
            id: Number(deckId.get("deckId")),
            name: input.name || "",
            cards: currentDeck.map((it) => it.id),
        });
    };

    const inputSaveDeck = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        inputType: keyof TDeckUpdateInput
    ) => {
        setInput({ ...input, [inputType]: e.target.value });
    };

    const generateRandomDeck = async () => {
        setGeneratingRNDCards(true);
    };

    useEffect(() => {
        if (randomCards) {
            defineDeck(randomCards);
            setGeneratingRNDCards(false);
        }
    }, [randomCards]);

    useEffect(() => {
        if (deckLoad) {
            defineDeck(deckLoad.cards);
            setInput({ ...input, name: deckLoad.name });
        }
    }, [deckLoad]);

    if (loading) {
        return <p>...loading</p>;
    }
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
                        <img src={card.images.small} onClick={() => removeCardfromDeck(card)}></img>
                    </Container>
                ))}
            </Card>
            <Button onClick={updateDeckButton}>Save Deck</Button>
            <Button onClick={saveDeckButton}>Save as new Deck</Button>
            <Button onClick={generateRandomDeck}>Generate Random Deck</Button>
            <Button onClick={() => setCurrentDeck(INITIAL_STATE)}>Delete All</Button>
            <Button onClick={() => defineDeck(deckLoad?.cards || [])}>Reset Deck</Button>

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
export default DeckEditor;
