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
import { Book } from "../books/books.entity";
import { Member } from "./members.entity";

@Entity("reading_history")
export class ReadingHistory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  started_at!: Date;

  @Column({ type: "timestamp", nullable: true })
  finished_at?: Date;

  @Column({ type: "interval", nullable: true })
  reading_duration?: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  progress_percentage!: number;

  @Column({ type: "int", nullable: true })
  rating?: number;

  @Column({ type: "text", nullable: true })
  review?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
