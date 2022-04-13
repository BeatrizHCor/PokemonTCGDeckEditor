import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class DeckDTO {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field(() => [String])
    cards: string[];
}

@ObjectType()
export class DeckUpdateDTO {
    @Field()
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field(() => [String], { nullable: true })
    cards?: string[];
}

@InputType()
export class DeckUpdateInput {
    @Field()
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field(() => [String], { nullable: true })
    cards?: string[];
}
@InputType()
export class DeckCreateInput {
    @Field()
    name: string;

    @Field(() => [String])
    cards: string[];
}
@InputType()
export class DeckloadOneInput {
    @Field()
    id: number;
}
