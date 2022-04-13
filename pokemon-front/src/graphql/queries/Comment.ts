import { gql } from "@apollo/client";

export const LOAD_COMMENT = gql`
    query LoadComments($deckId: Float!) {
        loadComments(deckId: $deckId) {
            id
            date
            content
        }
    }
`;
