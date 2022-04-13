import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
    TCommentCreateInput,
    TDeckCreateInput,
    TDeckUpdateInput,
    TLoadCommentsQuery,
    TLoadCommentsQueryVariables,
    TLoadDeckandCardsQuery,
    TLoadDeckandCardsQueryVariables,
    TQuery,
} from "../../generated";
import { CREATE_COMMENT } from "../mutations/Comment";
import { CREATE_DECK, UPDATE_DECK } from "../mutations/Deck";
import { LOAD_COMMENT } from "../queries/Comment";

import { LOAD_DECKS, LOAD_ONE_DECK } from "../queries/Deck";

export const useCommentLoad = (deckId: number) => {
    const { loading, error, data } = useQuery<TLoadCommentsQuery, TLoadCommentsQueryVariables>(
        LOAD_COMMENT,
        { variables: { deckId }, skip: !deckId }
    );
    const commentLoad = data?.loadComments;
    return { commentLoad, loading, error };
};

export const useSaveComment = () => {
    const [mutate] = useMutation(CREATE_COMMENT);
    return useCallback(
        (input: TCommentCreateInput) =>
            mutate({
                variables: { input },
            }),
        [mutate]
    );
};
