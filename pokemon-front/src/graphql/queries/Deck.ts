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
