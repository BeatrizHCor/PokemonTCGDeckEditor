import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { Comment } from "../../entity/Comments";
import { CommentCreateInput, CommentDTO } from "../dto/CommentDTO";
import { DeckDTO } from "../dto/DeckDTO";
import { Context } from "./UserResolver";

@Service()
@Resolver(CommentDTO)
export class CommentResolver {
    repository: Repository<Comment>;
    constructor() {
        const dataSource: DataSource = Container.get("dataSource");
        this.repository = dataSource.getRepository(Comment);
    }

    @Query((_) => [CommentDTO])
    async loadComments(@Arg("deckId") deckId: number) {
        return this.repository.find({ where: { deckid: deckId } });
    }

    @Mutation(() => CommentDTO)
    async createComment(@Arg("input") input: CommentCreateInput): Promise<CommentDTO> {
        return this.repository.save(input);
    }
}