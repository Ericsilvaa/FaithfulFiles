import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Book, book => book.publisher)
  books!: Book[];

  constructor(name: string, books: Book[]) {
    this.name = name;
    this.books = books;
  }

  static createPublisher(publisher: Publisher): Publisher {
    return new Publisher(
      publisher.name,
      publisher.books,
    );
  }
}