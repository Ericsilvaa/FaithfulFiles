import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BookEntity } from "./book.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.publisher)
  books!: BookEntity[];

  constructor(name: string, books: BookEntity[]) {
    this.name = name;
    this.books = books;
  }

  static createPublisher(publisher: Publisher): Publisher {
    return new Publisher(publisher.name, publisher.books);
  }
}
