import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BookEntity } from "./book.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books?: BookEntity[];

  constructor(name: string, books?: BookEntity[]) {
    this.name = name;
  }

  static createBook(author: Author): Author {
    return new Author(author.name);
  }
}
