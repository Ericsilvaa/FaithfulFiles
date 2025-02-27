import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity("members")
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "uuid" })
  church_id!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  joined_at!: Date;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "text", nullable: true })
  notes?: string;
}
