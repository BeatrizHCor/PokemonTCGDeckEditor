import { Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { Card } from "../../entity/Card";

@Service()
@Resolver(Card)
export class DeckResolver {
    repository: Repository<Card>;
    constructor() {
        const dataSource: DataSource = Container.get("dataSource");
        this.repository = dataSource.getRepository(Card);
    }

    @Query((_) => [String])
    async randomCards() {
        const rndCards: number[] = [];
        while (rndCards.length < 60) {
            const randomNumber = Math.floor(Math.random() * 14678) + 1;
            if (!rndCards.includes(randomNumber)) {
                rndCards.push(randomNumber);
            }
        }
        const cards = await this.repository
            .createQueryBuilder()
            .where("id = any(:cards)", { cards: rndCards })
            .getMany();
        return cards.map((card) => card.cardId);
    }
}
