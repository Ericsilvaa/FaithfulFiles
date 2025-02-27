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
import { Member } from "../users/members.entity";
import { User } from "../users/users.entity";

export enum ReservationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

@Entity("reservations")
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reservation_date!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP + interval '7 days'",
  })
  expiration_date!: Date;

  @Column({
    type: "enum",
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status!: ReservationStatus;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "processed_by" })
  processed_by?: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
