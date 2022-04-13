import { gql } from "@apollo/client";

export const LOAD_DECKS = gql`
    query LoadUserDecks {
        loadUserDecks {
            id
            name
            cards
        }
    }
`;
export const LOAD_ONE_DECK = gql`
    query LoadDeckandCards($deckId: Float!) {
        loadDeckandCards(deckId: $deckId) {
            id
            name
            cards
        }
    }
`;
