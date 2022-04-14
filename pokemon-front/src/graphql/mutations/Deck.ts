import { gql } from "@apollo/client";

export const UPDATE_DECK = gql`
    mutation updateDeck($input: DeckUpdateInput!) {
        updateDeck(input: $input) {
            id
            name
            cards
        }
    }
`;
export const CREATE_DECK = gql`
    mutation createDeck($input: DeckCreateInput!) {
        createDeck(input: $input) {
            name
            id
            cards
        }
    }
`;
export const DELETE_DECK = gql`
    mutation DeleteDeck($deckId: Float!) {
        deleteDeck(deckId: $deckId)
    }
`;
