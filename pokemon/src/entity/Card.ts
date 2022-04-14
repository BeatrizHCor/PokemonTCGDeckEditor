import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Card extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    cardId: string;
}
