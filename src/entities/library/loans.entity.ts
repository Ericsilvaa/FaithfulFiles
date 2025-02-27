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
import { User } from "../users/users.entity";

export enum LoanStatus {
  ACTIVE = "active",
  OVERDUE = "overdue",
  RETURNED = "returned",
  LOST = "lost",
  DAMAGED = "damaged",
}

@Entity("loans")
export class Loan extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @ManyToOne(() => BookCopy, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_copy_id" })
  book_copy!: BookCopy;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "issued_by" })
  issued_by!: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  borrowed_at!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP + interval '14 days'",
  })
  due_date!: Date;

  @Column({ type: "timestamp", nullable: true })
  return_deadline?: Date;

  @Column({ type: "enum", enum: LoanStatus, default: LoanStatus.ACTIVE })
  status!: LoanStatus;

  @Column({ type: "boolean", default: false })
  is_extended!: boolean;

  @Column({ type: "text", nullable: true })
  extension_request?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
