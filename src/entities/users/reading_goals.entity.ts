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
import { Member } from "./members.entity";

export enum GoalStatus {
  BEHIND = "Behind",
  ON_TRACK = "On Track",
  AHEAD = "Ahead",
  COMPLETED = "Completed",
}

export enum GoalType {
  BOOKS = "books",
  PAGES = "pages",
  TIME = "time",
}

@Entity("reading_goals")
export class ReadingGoal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Member, { onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member!: Member;

  @Column({ type: "smallint", check: "year >= 2000" })
  year!: number;

  @Column({ type: "int", default: 0, check: "goal >= 0" })
  goal!: number;

  @Column({ type: "int", default: 0, check: "progress >= 0" })
  progress!: number;

  @Column({ type: "enum", enum: GoalStatus, default: GoalStatus.ON_TRACK })
  status!: GoalStatus;

  @Column({ type: "enum", enum: GoalType, default: GoalType.BOOKS })
  goal_type!: GoalType;

  @Column({ type: "text", nullable: true })
  last_book_read?: string;

  @Column({ type: "date", nullable: true })
  expected_completion_date?: Date;

  @Column({
    type: "text",
    default: "Keep going strong on your reading journey!",
  })
  motivation_message!: string;

  @Column({ type: "int", default: 0, check: "reward_points >= 0" })
  reward_points!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
