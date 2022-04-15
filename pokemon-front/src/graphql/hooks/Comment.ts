import { useMutation, useQuery } from "@apollo/client";
import { useCallback } from "react";
import {
    TCommentCreateInput,
    TLoadCommentsQuery,
    TLoadCommentsQueryVariables,
} from "../../generated";
import { CREATE_COMMENT, DELETE_COMMENT } from "../mutations/Comment";
import { LOAD_COMMENT } from "../queries/Comment";

// Hooks não ultilizados para Carregamento e criação de Comentários no Deck

export const useCommentLoad = (deckId: number) => {
    const { loading, error, data } = useQuery<TLoadCommentsQuery, TLoadCommentsQueryVariables>(
        LOAD_COMMENT,
        { variables: { deckId }, skip: !deckId }
    );
    const commentLoad = data?.loadComments || [];
    return { commentLoad, loading, error };
};

export const useSaveComment = () => {
    const [mutate] = useMutation(CREATE_COMMENT, { refetchQueries: [LOAD_COMMENT] });
    return useCallback(
        (input: TCommentCreateInput) =>
            mutate({
                variables: { input },
            }),
        [mutate]
    );
};

export const useDeleteComment = () => {
    const [mutate] = useMutation(DELETE_COMMENT, { refetchQueries: [LOAD_COMMENT] });
    return useCallback((commentId: Number) => mutate({ variables: { commentId } }), [mutate]);
};
