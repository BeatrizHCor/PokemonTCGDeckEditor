import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Deck } from "./Deck";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    content: string;

    @Column()
    deckid: number;

    @ManyToOne(() => Deck, (deck) => deck.comments)
    @JoinColumn({ name: "deckId" })
    deck: Deck;
}
