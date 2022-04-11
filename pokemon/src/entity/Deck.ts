import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Deck extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text", { array: true, nullable: true })
    cards: string[];

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.decks)
    @JoinColumn({ name: "userId" })
    user: User;
}
