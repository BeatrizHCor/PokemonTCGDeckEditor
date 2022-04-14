import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
    TDeckCreateInput,
    TDeckUpdateInput,
    TLoadDeckandCardsQuery,
    TLoadDeckandCardsQueryVariables,
    TQuery,
} from "../../generated";
import { CREATE_DECK, DELETE_DECK, UPDATE_DECK } from "../mutations/Deck";

import { LOAD_DECKS, LOAD_ONE_DECK } from "../queries/Deck";

export const useDeckLoad = () => {
    const { loading, error, data } = useQuery<TQuery>(LOAD_DECKS);
    const decks = data?.loadUserDecks || [];
    return { decks, loading, error };
};
export const useDeckLoadOne = (deckId: number) => {
    const { loading, error, data } = useQuery<
        TLoadDeckandCardsQuery,
        TLoadDeckandCardsQueryVariables
    >(LOAD_ONE_DECK, { variables: { deckId }, skip: !deckId });
    const deckLoad = data?.loadDeckandCards;
    return { deckLoad, loading, error };
};

export const useUpdateDeck = () => {
    const [mutate] = useMutation(UPDATE_DECK);
    return useCallback(
        (input: TDeckUpdateInput) =>
            mutate({
                variables: { input },
            }),
        [mutate]
    );
};

export const useSaveDeck = () => {
    const [mutate] = useMutation(CREATE_DECK);
    return useCallback(
        (input: TDeckCreateInput) =>
            mutate({
                variables: { input },
            }),
        [mutate]
    );
};

export const useDeleteDeck = () => {
    const [mutate] = useMutation(DELETE_DECK, { refetchQueries: [LOAD_DECKS] });
    return useCallback((deckId: Number) => mutate({ variables: { deckId } }), [mutate]);
};
