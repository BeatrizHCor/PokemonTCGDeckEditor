import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { TUserInput, TUserLoginInput } from "../../generated/";
import { CREATE_USER, LOGIN_USER } from "../mutations/User";

// Hooks para Carregar e Logar um Usuário
export const useUserRegister = () => {
    const [mutate] = useMutation(CREATE_USER);
    return useCallback(
        (input: TUserInput) =>
            mutate({
                variables: { input },
            }),
        [mutate]
    );
};
export const useUserLogin = () => {
    const [mutate] = useMutation(LOGIN_USER);
    return useCallback((input: TUserLoginInput) => mutate({ variables: { input } }), [mutate]);
};
