import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { TDeckCreateInput, TDeckUpdateInput, TQuery } from "../../generated";
import { CREATE_DECK, UPDATE_DECK } from "../mutations/Deck";

import { LOAD_DECKS } from "../queries/Deck";

export const useDeckLoad = () => {
    const { loading, error, data } = useQuery<TQuery>(LOAD_DECKS);
    const decks = data?.loadUserDecks || [];
    return { decks, loading, error };
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
