import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
    mutation CreateComment($input: CommentCreateInput!) {
        createComment(input: $input) {
            id
            date
            content
        }
    }
`;
