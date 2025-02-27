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
import { BookCopy } from "../books/book_copies.entity";

export enum LoanHistoryStatus {
  RETURNED = "returned",
  OVERDUE = "overdue",
  LOST = "lost",
  DAMAGED = "damaged",
}

@Entity("loan_history")
export class LoanHistory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @ManyToOne(() => BookCopy, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_copy_id" })
  book_copy!: BookCopy;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  borrowed_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP + interval '14 days'",
  })
  due_date!: Date;

  @Column({ type: "timestamp", nullable: true })
  returned_at?: Date;

  @Column({
    type: "enum",
    enum: LoanHistoryStatus,
    default: LoanHistoryStatus.RETURNED,
  })
  status!: LoanHistoryStatus;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
