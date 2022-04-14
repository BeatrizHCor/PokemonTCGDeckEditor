import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

// Entidade Cartas que relaciona um id (1-14679) com os ids únicos das cartas Ultilizadas pela API

@Entity()
export class Card extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    cardId: string;
}
