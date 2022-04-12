import { gql } from "@apollo/client";

export const UPDATE_DECK = gql`
    mutation Mutation($input: DeckUpdateInput!) {
        updateDeck(input: $input) {
            id
            name
            cards
        }
    }
`;
export const CREATE_DECK = gql`
    mutation Mutation($input: DeckCreateInput!) {
        createDeck(input: $input) {
            name
            id
            cards
        }
    }
`;
