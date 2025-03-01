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
// import { Member } from "../users/members.entity";
// import { User } from "../users/users.entity";
// import { Book } from "./books.entity";

// export enum BookRequestStatus {
//   PENDING = "pending",
//   APPROVED = "approved",
//   DENIED = "denied",
//   NOTIFIED = "notified",
// }

// @Entity("book_requests")
// export class BookRequest extends BaseEntity {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;

//   @ManyToOne(() => Member, { onDelete: "CASCADE" })
//   @JoinColumn({ name: "member_id" })
//   member!: Member;

//   @ManyToOne(() => Book, { nullable: true, onDelete: "SET NULL" })
//   @JoinColumn({ name: "book_id" })
//   book?: Book;

//   @Column({ type: "text" })
//   title!: string;

//   @Column({ type: "text" })
//   author!: string;

//   @Column({ type: "text" })
//   category!: string;

//   @Column({
//     type: "enum",
//     enum: BookRequestStatus,
//     default: BookRequestStatus.PENDING,
//   })
//   status!: BookRequestStatus;

//   @CreateDateColumn()
//   created_at!: Date;

//   @Column({ type: "timestamp", nullable: true })
//   processed_at?: Date;

//   @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
//   @JoinColumn({ name: "processed_by" })
//   processed_by?: User;

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
import { Member } from "../users/members.entity";
import { User } from "../users/users.entity";
import { Book } from "./books.entity";

export enum BookRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied",
  NOTIFIED = "notified",
}

@Entity("book_requests")
export class BookRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 📌 Relacionamento com `Member`
  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  // 📌 Relacionamento com `Book` (opcional)
  @ManyToOne(() => Book, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "book_id" })
  book?: Book | null;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  author!: string;

  @Column({ type: "text" })
  category!: string;

  // 📌 Status com enum TypeScript e valores no PostgreSQL
  @Column({
    type: "enum",
    enum: BookRequestStatus,
    default: BookRequestStatus.PENDING,
  })
  status!: BookRequestStatus;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  // 📌 Data do processamento (opcional)
  @Column({ type: "timestamp", nullable: true })
  processed_at?: Date | null;

  // 📌 Relacionamento com `User` (admin que processou a requisição)
  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "processed_by" })
  processed_by?: User | null;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
}
