import React, { useEffect, useState } from "react";
import { Button, Card, Container, TextField } from "@mui/material/";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Box } from "@mui/system";
import { useDeckLoadOne, useSaveDeck, useUpdateDeck } from "../../graphql/hooks/Deck";
import { TDeckUpdateInput } from "../../generated";
import { useSearchParams } from "react-router-dom";
import { useRandomCard } from "../../graphql/hooks/Cards";
import { CatchingPokemon } from "@mui/icons-material";
import CommentDialog from "./CommentDialog";
import { useCommentLoad } from "../../graphql/hooks/Comment";
import useToggle from "../../hooks/useToggle";

const INITIAL_STATE: PokemonTCG.Card[] = [];
const INITIAL_SAVE_STATE = {
    id: -1,
    cards: [],
};

// Editor de Decks com função de Geração automática de um Deck de 60 Cartas, Salvar Alterações e Salvar novos Decks. Ultiliza pokemon-tcg-sdk-typescript para encontrar Cartas da sua API
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
    const { commentLoad } = useCommentLoad(Number(deckId.get("deckId")));
    const [isOpen, toggleOpen] = useToggle();

    // Função que consiste em carregar as cartas de um Array de Ids fornecido. Usado para Carregar Decks pelo parâmetro URL ou Gerar Decks Aleatórios
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

    // Função para encontrar uma carta com nome que contenha a pesquisa do usuário
    const findByName = async () => {
        const cards = await PokemonTCG.findCardsByQueries({ q: `name:*${cardSearch}*` });
        setCardData(cards);
    };
    // adiciona cartas pesquisadas ao deck que esta sendo editado
    const addCardtoDeck = async (cardid: string) => {
        const cardstoDeck = await PokemonTCG.findCardByID(`${cardid}`);
        if (currentDeck.includes(cardstoDeck)) {
            return null;
        }
        setCurrentDeck([...currentDeck, cardstoDeck]);
    };
    // Remove as cartas do deck que esta sendo editado
    const removeCardfromDeck = async (card: PokemonTCG.Card) => {
        let i = currentDeck.indexOf(card);
        const ii = i--;
        const currentDeckCopy = [...currentDeck];
        currentDeckCopy.splice(ii, 1);
        setCurrentDeck(currentDeckCopy);
    };
    // Salva todas as alterações do Deck como um novo Deck
    const saveDeckButton = async () => {
        saveDeck({
            name: input.name || "",
            cards: currentDeck.map((it) => it.id),
        });
    };

    // Salva as auterações do Deck
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
        <Box width="100%" sx={{ display: "flex", marginTop: 15 }}>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flex: "0 0 300px",
                    width: "100%",
                    height: "100%",
                    paddingBottom: "5rem",
                    backgroundColor: "#F5F5F5",
                }}>
                <p style={{ marginBottom: "none", fontSize: "2rem" }}>Nome do Deck</p>
                <TextField
                    sx={{
                        color: "#0075BE",
                        margin: "none",
                    }}
                    type="text"
                    name="Deck Name"
                    value={input.name}
                    onChange={(event) => inputSaveDeck(event, "name")}
                />
                <Button onClick={toggleOpen}>Comentários</Button>

                <Button
                    variant="contained"
                    sx={{ height: 50, margin: 1 }}
                    onClick={updateDeckButton}>
                    Salvar Alterações
                </Button>
                <Button variant="contained" sx={{ height: 70, margin: 1 }} onClick={saveDeckButton}>
                    Salvar como Novo Deck
                </Button>
                <Button
                    variant="contained"
                    sx={{ height: 70, margin: 1 }}
                    onClick={generateRandomDeck}>
                    Gerar Deck Aleatório
                </Button>
                <Button
                    variant="outlined"
                    sx={{ height: 70, margin: 1, color: "#E54222", borderColor: "#E54222" }}
                    onClick={() => setCurrentDeck(INITIAL_STATE)}>
                    Deletar todas as Cartas
                </Button>
                <Button
                    variant="contained"
                    sx={{ height: 50, margin: 1, backgroundColor: "#0C3348" }}
                    onClick={() => defineDeck(deckLoad?.cards || [])}>
                    Recarregar Deck
                </Button>
                <Container
                    sx={{
                        marginBottom: "none",
                        display: "flex",
                        alignItems: "center",
                    }}></Container>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,

                        backgroundColor: "#F5F5F5",
                    }}>
                    <p style={{ fontSize: 15, color: "#1361f3" }}>
                        Coloque um nome para procurar por novas cartas
                    </p>
                    <TextField
                        placeholder="Nome da Carta"
                        onChange={(e) => setCardSearch(e.target.value)}
                    />
                    <Button
                        sx={{ backgroundColor: "#a6cef3", color: "#FFFFFF" }}
                        onClick={findByName}>
                        Procurar
                    </Button>
                </Container>
            </Card>
            <div>
                <Container
                    sx={{
                        marginBottom: "none",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        width: "100%",
                        justifyContent: "center",
                        position: "relative",
                    }}>
                    <CatchingPokemon />
                    <p>
                        Clique em uma carta do deck para removê-la. Clique em uma carta pesquisada
                        para adiciona-la.
                    </p>
                    <CatchingPokemon />
                </Container>

                <Card
                    sx={{
                        display: "flex",
                        overflow: "auto",
                        margin: 1,
                        height: 700,
                        minHeight: 350,
                        width: 1000,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginLeft: 5,
                    }}>
                    {currentDeck.map((card) => (
                        <Container
                            sx={{
                                margin: 1,
                                width: "fit-content",
                                overflow: "auto",
                            }}
                            key={card.id}>
                            <img
                                style={{
                                    maxWidth: 150,
                                    cursor: "pointer",
                                }}
                                src={card.images.small}
                                onClick={() => removeCardfromDeck(card)}></img>
                        </Container>
                    ))}
                </Card>

                {cardData.length > 0 && (
                    <Container>
                        <p>Selecione as cartas pesquisadas abaixo</p>
                        <Card
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                overflowX: "auto",
                                overflowY: "hidden",
                                maxWidth: 1000,
                                position: "relative",
                                left: 16,
                            }}>
                            {cardData.map((card) => (
                                <Container key={card.id} sx={{ minWidth: 300, height: 350 }}>
                                    <img
                                        src={card.images.small}
                                        style={{
                                            maxWidth: 250,

                                            cursor: "pointer",
                                        }}
                                        onClick={() => addCardtoDeck(card.id)}></img>
                                    <p>{card.name}</p>
                                </Container>
                            ))}
                        </Card>
                    </Container>
                )}
            </div>

            <CommentDialog
                isOpen={isOpen}
                comments={commentLoad}
                toggleOpen={toggleOpen}
                id={Number(deckId.get("deckId"))}
            />
        </Box>
    );
};
export default DeckEditor;
