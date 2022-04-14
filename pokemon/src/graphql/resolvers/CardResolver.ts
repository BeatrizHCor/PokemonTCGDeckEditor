import { Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { Card } from "../../entity/Card";

// Uma única Query que gera um Deck de 60 Cartas para um usuário através da tabela de Cartas Salvas. Necessário pois a geração de Deck ultilizando diretamente a API se tornava inviavél pelo número muito alto de cartas (14679 cartas ao todo)

@Service()
@Resolver(Card)
export class DeckResolver {
    repository: Repository<Card>;
    constructor() {
        const dataSource: DataSource = Container.get("dataSource");
        this.repository = dataSource.getRepository(Card);
    }

    // Seleciona um número aleatório entre 1 e 14679, repetido 60 vezes. Retorna um Array de Ids de cartas relacionadas aos 60 números aleatórios fornecidos
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
