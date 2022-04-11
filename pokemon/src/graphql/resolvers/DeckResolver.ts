import { JwtPayload, verify } from "jsonwebtoken";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { Deck } from "../../entity/Deck";
import { ACCESS_TOKEN_SECRET } from "../../middlewares/constants";
import { DeckCreateInput, DeckDTO, DeckUpdateDTO, DeckUpdateInput } from "../dto/DeckDTO";
import { Context } from "./UserResolver";

@Service()
@Resolver(DeckDTO)
export class DeckResolver {
    repository: Repository<Deck>;
    constructor() {
        const dataSource: DataSource = Container.get("dataSource");
        this.repository = dataSource.getRepository(Deck);
    }

    @Query((_) => [DeckDTO])
    async loadUserDecks(@Ctx() context: Context) {
        const { user } = context;
        return this.repository.find({ where: { userId: user.id } });
    }

    @Mutation((_) => DeckUpdateDTO)
    async updateDeck(
        @Arg("input") input: DeckUpdateInput,
        @Ctx() context: Context
    ): Promise<DeckDTO> {
        const { user } = context;
        const deck = await this.repository.findOneOrFail({
            where: { id: input.id },
        });
        if (deck.user.id !== user.id) {
            throw new Error("Esse Deck não pertence a esse usuário");
        }
        return this.repository.save(input);
    }

    @Mutation((_) => DeckDTO)
    async createDeck(
        @Arg("input") input: DeckCreateInput,
        @Ctx() context: Context
    ): Promise<DeckDTO> {
        const { user } = context;
        return this.repository.save({ ...input, user });
    }
}
