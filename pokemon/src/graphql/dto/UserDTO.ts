import { Field, InputType, ObjectType } from "type-graphql";
import { DeckDTO } from "./DeckDTO";

// DTO para definir Input e retorno de Usuário

@ObjectType()
export class UserDTO {
    @Field()
    id: number;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => [DeckDTO])
    decks: DeckDTO[];
}
@InputType()
export class UserInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class UserLoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}
