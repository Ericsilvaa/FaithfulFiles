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
import { UserEntity } from "./user.entity";

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
  deleted_at?: Boolean

  @ManyToOne(() => UserEntity, user => user.owner_book, { nullable: true }) // Relacionamento ManyToOne com UserEntity
  owner?: UserEntity;

  constructor(
    title: string,
    page_count: number,
    description: string,
    available: boolean,
    loan_count: number,
    author?: Author,
    publisher?: Publisher,
    deleted_at?: Boolean
  ) {
    this.title = title;
    this.page_count = page_count;
    this.description = description;
    this.available = available;
    this.loan_count = loan_count;
    this.author = author;
    this.publisher = publisher;
    this.deleted_at = deleted_at;
  }

  static createBook(book: Book): Book {
    return new Book(
      book.title,
      book.page_count,
      book.description,
      book.available,
      book.loan_count,
      book.author,
      book.publisher,
      book.deleted_at
    );
  }
}
