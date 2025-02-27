import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { BookEntity } from "./book.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => Book, (book) => book.id)
  book: BookEntity;

  @Column()
  rating: number;

  @Column()
  comment: string;
}
