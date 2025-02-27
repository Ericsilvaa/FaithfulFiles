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

export enum FeedbackType {
  SUGGESTION = "suggestion",
  COMPLAINT = "complaint",
  PRAISE = "praise",
  GENERAL = "general",
}

export enum FeedbackVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
  MEMBERS_ONLY = "members-only",
}

@Entity("library_feedback")
export class LibraryFeedback extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "enum", enum: FeedbackType, default: FeedbackType.GENERAL })
  feedback_type!: FeedbackType;

  @Column({ type: "text" })
  comment!: string;

  @Column({ type: "boolean", default: false })
  is_anonymous!: boolean;

  @Column({ type: "boolean", default: false })
  is_approved!: boolean;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "approved_by" })
  approved_by?: User;

  @Column({ type: "boolean", default: false })
  reported!: boolean;

  @Column({
    type: "enum",
    enum: FeedbackVisibility,
    default: FeedbackVisibility.PUBLIC,
  })
  visibility!: FeedbackVisibility;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
