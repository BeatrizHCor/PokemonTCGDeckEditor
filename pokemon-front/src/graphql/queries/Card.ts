import { gql } from "@apollo/client";

export const RANDOM_CARDS = gql`
    query randomCardsGet {
        randomCards
    }
`;
