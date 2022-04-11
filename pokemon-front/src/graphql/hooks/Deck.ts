import { useQuery } from "@apollo/client";

import { LOAD_DECKS } from "../queries/Deck";

export const useDeckLoad = () => {
    const { loading, error, data } = useQuery(LOAD_DECKS);
    const decks = data.loadUserDecks;
    return { decks, loading, error };
};
