import { useQuery } from "@apollo/client";
import { TRandomCardsGetQuery } from "../../generated";
import { RANDOM_CARDS } from "../queries/Card";

export const useRandomCard = (generate: Boolean) => {
    const { loading, error, data } = useQuery<TRandomCardsGetQuery>(RANDOM_CARDS, {
        skip: !generate,
    });
    return { randomCards: data?.randomCards, loading, error };
};
