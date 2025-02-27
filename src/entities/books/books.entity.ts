import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { Author } from "./authors.entity";
import { Category } from "./categories.entity";
import { Publisher } from "./publishers.entity";

export enum BookStatus {
  AVAILABLE = "available",
  BORROWED = "borrowed",
  RESERVED = "reserved",
  MAINTENANCE = "maintenance",
  LOST = "lost",
}

export enum Language {
  PORTUGUESE = "Portuguese",
  ENGLISH = "English",
  SPANISH = "Spanish",
  OTHER = "Other",
}

@Entity("books")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Author, { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author!: Author;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @ManyToOne(() => Publisher, { onDelete: "CASCADE" })
  @JoinColumn({ name: "publisher_id" })
  publisher!: Publisher;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 20, unique: true })
  isbn!: string;

  @Column({ type: "smallint" })
  published_year!: number;

  @Column({ type: "enum", enum: Language, default: Language.PORTUGUESE })
  language!: Language;

  @Column({ type: "varchar", length: 50, nullable: true })
  edition?: string;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  acquired_at!: Date;

  @Column({ type: "int", default: 1 })
  total_copies!: number;

  @Column({ type: "int", default: 1 })
  available_copies!: number;

  @Column({ type: "enum", enum: BookStatus, default: BookStatus.AVAILABLE })
  status!: BookStatus;

  @Column({ type: "varchar", length: 50, unique: true })
  library_code!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
