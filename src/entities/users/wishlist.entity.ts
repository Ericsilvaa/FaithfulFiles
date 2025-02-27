import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BookEntity } from "../books/book.entity";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => Book, (book) => book.id)
  book: BookEntity;
}
