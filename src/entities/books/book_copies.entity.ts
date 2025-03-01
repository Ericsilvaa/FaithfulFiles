// import {
//   Entity,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   BaseEntity,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from "typeorm";
// import { Book } from "./books.entity";

// export enum CopyStatus {
//   AVAILABLE = "available",
//   BORROWED = "borrowed",
//   RESERVED = "reserved",
//   DAMAGED = "damaged",
//   LOST = "lost",
// }

// @Entity("book_copies")
// export class BookCopy extends BaseEntity {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;

//   @ManyToOne(() => Book, { onDelete: "CASCADE" })
//   @JoinColumn({ name: "book_id" })
//   book!: Book;

//   @Column({ type: "int" })
//   copy_number!: number;

//   @Column({ type: "enum", enum: CopyStatus, default: CopyStatus.AVAILABLE })
//   status!: CopyStatus;

//   @Column({ type: "varchar", length: 100, default: "Main Library" })
//   location!: string;

//   @Column({ type: "timestamp", nullable: true })
//   last_borrowed_at?: Date;

//   @Column({ type: "timestamp", nullable: true })
//   last_returned_at?: Date;

//   @Column({ type: "jsonb", default: () => "'[]'" })
//   status_history!: object[];

//   @CreateDateColumn()
//   created_at!: Date;

//   @UpdateDateColumn()
//   updated_at!: Date;
// }

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./books.entity";

export enum CopyStatus {
  AVAILABLE = "available",
  BORROWED = "borrowed",
  RESERVED = "reserved",
  DAMAGED = "damaged",
  LOST = "lost",
}

@Entity("book_copies")
export class BookCopy extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 📌 Relacionamento com `Book` corrigido
  @ManyToOne(() => Book, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @Column({ type: "int" })
  copy_number!: number;

  @Column({ type: "enum", enum: CopyStatus, default: CopyStatus.AVAILABLE })
  status!: CopyStatus;

  @Column({ type: "varchar", length: 100, default: "Main Library" })
  location!: string;

  @Column({ type: "timestamp", nullable: true })
  last_borrowed_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  last_returned_at?: Date;

  // 📌 Garantindo que `status_history` seja um array de objetos válido
  @Column({ type: "jsonb", default: () => "'[]'" })
  status_history!: { status: CopyStatus; changed_at: Date }[];

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
}
