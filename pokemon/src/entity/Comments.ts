import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Deck } from "./Deck";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    date: Date;

    @Column()
    content: string;

    @Column()
    deckId: number;

    @ManyToOne(() => Deck, (deck) => deck.comments)
    @JoinColumn({ name: "deckId" })
    deck: Deck;
}
