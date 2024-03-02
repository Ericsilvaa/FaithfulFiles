import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import { Author } from "./author.entity";
import { Publisher } from "./publisher.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  page_count: number;

  @ManyToOne(() => Author, { nullable: true })
  author?: Author;

  @Column()
  description: string;

  @ManyToOne(() => Publisher, { nullable: true })
  publisher?: Publisher;

  @Column()
  available: boolean;

  @Column({ default: 0 })
  loan_count: number;

  @DeleteDateColumn({ name: "deleted_at", type: "boolean" })
  deleted_at?: Boolean | null;

  constructor(
    title: string,
    page_count: number,
    description: string,
    available: boolean,
    loan_count: number,
    author?: Author,
    publisher?: Publisher
  ) {
    this.title = title;
    this.page_count = page_count;
    this.description = description;
    this.available = available;
    this.loan_count = loan_count;
    this.author = author;
    this.publisher = publisher;
  }

  static createBook(book: Book): Book {
    return new Book(
      book.title,
      book.page_count,
      book.description,
      book.available,
      book.loan_count,
      book.author,
      book.publisher
    );
  }
}
