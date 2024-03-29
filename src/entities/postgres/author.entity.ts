import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Book, book => book.author)
  books?: Book[];

  constructor(name: string, books?: Book[]) {
    this.name = name;
  }

  static createBook(author: Author): Author {
    return new Author(
      author.name,
    );
  }
}