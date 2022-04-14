import { Field, InputType, ObjectType } from "type-graphql";
// DTO não ultilizado para Criação e carregamentos de Comentários
@ObjectType()
export class CommentDTO {
    @Field()
    id: number;

    @Field()
    date: Date;

    @Field()
    content: string;
}
@InputType()
export class CommentCreateInput {
    @Field()
    content: string;

    @Field()
    deckid: number;

    @Field()
    date: Date;
}
