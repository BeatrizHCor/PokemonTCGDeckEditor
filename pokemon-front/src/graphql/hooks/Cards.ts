import { useQuery } from "@apollo/client";
import { TRandomCardsGetQuery } from "../../generated";
import { RANDOM_CARDS } from "../queries/Card";

// Hook para geração de um Deck Aleatório de 60 cartas usando o CSV que contém todos os Ids das cartas

export const useRandomCard = (generate: Boolean) => {
    const { loading, error, data } = useQuery<TRandomCardsGetQuery>(RANDOM_CARDS, {
        skip: !generate,
    });
    return { randomCards: data?.randomCards, loading, error };
};
