import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser($input: UserInput!) {
        createUser(input: $input) {
            username
            email
            password
        }
    }
`;

export const LOGIN_USER = gql`
    mutation loginUser($input: UserLoginInput!) {
        loginUser(input: $input)
    }
`;
