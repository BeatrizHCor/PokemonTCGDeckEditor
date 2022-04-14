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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type TCommentCreateInput = {
  content: Scalars['String'];
  date: Scalars['DateTime'];
  deckid: Scalars['Float'];
};

export type TCommentDto = {
  content: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['Float'];
};

export type TDeckCreateInput = {
  cards: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type TDeckDto = {
  cards: Array<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type TDeckUpdateDto = {
  cards?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
};

export type TDeckUpdateInput = {
  cards?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
};

export type TDeckloadOneInput = {
  id: Scalars['Float'];
};

export type TMutation = {
  createComment: TCommentDto;
  createDeck: TDeckDto;
  createUser: TUserDto;
  deleteDeck: Scalars['Float'];
  loginUser: Scalars['String'];
  updateDeck: TDeckUpdateDto;
};


export type TMutationCreateCommentArgs = {
  input: TCommentCreateInput;
};


export type TMutationCreateDeckArgs = {
  input: TDeckCreateInput;
};


export type TMutationCreateUserArgs = {
  input: TUserInput;
};


export type TMutationDeleteDeckArgs = {
  deckId: Scalars['Float'];
};


export type TMutationLoginUserArgs = {
  input: TUserLoginInput;
};


export type TMutationUpdateDeckArgs = {
  input: TDeckUpdateInput;
};

export type TQuery = {
  loadComments: Array<TCommentDto>;
  loadDeckandCards: TDeckDto;
  loadUser: TUserDto;
  loadUserDecks: Array<TDeckDto>;
  randomCards: Array<Scalars['String']>;
};


export type TQueryLoadCommentsArgs = {
  deckId: Scalars['Float'];
};


export type TQueryLoadDeckandCardsArgs = {
  deckId: Scalars['Float'];
};


export type TQueryLoadUserArgs = {
  token: Scalars['String'];
};

export type TUserDto = {
  decks: Array<TDeckDto>;
  email: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type TUserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TCreateCommentMutationVariables = Exact<{
  input: TCommentCreateInput;
}>;


export type TCreateCommentMutation = { createComment: { id: number, date: any, content: string } };

export type TUpdateDeckMutationVariables = Exact<{
  input: TDeckUpdateInput;
}>;


export type TUpdateDeckMutation = { updateDeck: { id: number, name?: string | null, cards?: Array<string> | null } };

export type TCreateDeckMutationVariables = Exact<{
  input: TDeckCreateInput;
}>;


export type TCreateDeckMutation = { createDeck: { name: string, id: number, cards: Array<string> } };

export type TCreateUserMutationVariables = Exact<{
  input: TUserInput;
}>;


export type TCreateUserMutation = { createUser: { username: string, email: string, password: string } };

export type TLoginUserMutationVariables = Exact<{
  input: TUserLoginInput;
}>;


export type TLoginUserMutation = { loginUser: string };

export type TRandomCardsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type TRandomCardsGetQuery = { randomCards: Array<string> };

export type TLoadCommentsQueryVariables = Exact<{
  deckId: Scalars['Float'];
}>;


export type TLoadCommentsQuery = { loadComments: Array<{ id: number, date: any, content: string }> };

export type TLoadUserDecksQueryVariables = Exact<{ [key: string]: never; }>;


export type TLoadUserDecksQuery = { loadUserDecks: Array<{ id: number, name: string, cards: Array<string> }> };

export type TLoadDeckandCardsQueryVariables = Exact<{
  deckId: Scalars['Float'];
}>;


export type TLoadDeckandCardsQuery = { loadDeckandCards: { id: number, name: string, cards: Array<string> } };
