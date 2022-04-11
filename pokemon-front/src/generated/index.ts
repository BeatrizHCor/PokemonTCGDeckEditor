export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type TDeckCreateInput = {
    cards: Array<Scalars["String"]>;
    name: Scalars["String"];
};

export type TDeckDto = {
    cards: Array<Scalars["String"]>;
    id: Scalars["Float"];
    name: Scalars["String"];
};

export type TDeckUpdateDto = {
    cards?: Maybe<Array<Scalars["String"]>>;
    id: Scalars["Float"];
    name?: Maybe<Scalars["String"]>;
};

export type TDeckUpdateInput = {
    cards?: InputMaybe<Array<Scalars["String"]>>;
    id: Scalars["Float"];
    name?: InputMaybe<Scalars["String"]>;
};

export type TMutation = {
    createDeck: TDeckDto;
    createUser: TUserDto;
    loginUser: Scalars["String"];
    updateDeck: TDeckUpdateDto;
};

export type TMutationCreateDeckArgs = {
    input: TDeckCreateInput;
};

export type TMutationCreateUserArgs = {
    input: TUserInput;
};

export type TMutationLoginUserArgs = {
    input: TUserLoginInput;
};

export type TMutationUpdateDeckArgs = {
    input: TDeckUpdateInput;
};

export type TQuery = {
    loadUser: TUserDto;
    loadUserDecks: Array<TDeckDto>;
};

export type TQueryLoadUserArgs = {
    token: Scalars["String"];
};

export type TUserDto = {
    decks: Array<TDeckDto>;
    email: Scalars["String"];
    id: Scalars["Float"];
    password: Scalars["String"];
    username: Scalars["String"];
};

export type TUserInput = {
    email: Scalars["String"];
    password: Scalars["String"];
    username: Scalars["String"];
};

export type TUserLoginInput = {
    email: Scalars["String"];
    password: Scalars["String"];
};

export type TCreateUserMutationVariables = Exact<{
    input: TUserInput;
}>;

export type TCreateUserMutation = {
    createUser: { username: string; email: string; password: string };
};

export type TLoginUserMutationVariables = Exact<{
    input: TUserLoginInput;
}>;

export type TLoginUserMutation = { loginUser: string };
