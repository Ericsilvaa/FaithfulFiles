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
import { Member } from "../users/members.entity";
import { User } from "../users/users.entity";

export enum ReviewVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
  MEMBERS_ONLY = "members-only",
}

@Entity("reviews")
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book!: Book;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "text", nullable: true })
  comment?: string;

  @Column({ type: "boolean", default: false })
  is_approved!: boolean;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "approved_by" })
  approved_by?: User;

  @Column({ type: "boolean", default: false })
  reported!: boolean;

  @Column({
    type: "enum",
    enum: ReviewVisibility,
    default: ReviewVisibility.PUBLIC,
  })
  visibility!: ReviewVisibility;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
