import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  BANNED = "banned",
}

export enum UserRole {
  USER = "user",
  MODERATOR = "moderator",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export enum ChurchRole {
  PASTOR = "pastor",
  ASSISTANT_PASTOR = "assistant_pastor",
  EVANGELIST = "evangelist",
  MISSIONARY = "missionary",
  WORSHIP_LEADER = "worship_leader",
  YOUTH_LEADER = "youth_leader",
  CHILDREN_MINISTRY_LEADER = "children_ministry_leader",
  WOMEN_MINISTRY_LEADER = "women_ministry_leader",
  MEN_MINISTRY_LEADER = "men_ministry_leader",
  EDUCATION_MINISTRY_LEADER = "education_ministry_leader",
  ADMINISTRATOR = "administrator",
  SECRETARY = "secretary",
  TREASURER = "treasurer",
  FINANCE_COMMITTEE = "finance_committee",
  MUSICIAN = "musician",
  CHOIR_MEMBER = "choir_member",
  AUDIO_VISUAL_TEAM = "audio_visual_team",
  DEACON = "deacon",
  USHER = "usher",
  HOSPITALITY_TEAM = "hospitality_team",
  SECURITY_TEAM = "security_team",
  MEMBER = "member",
}

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "text" })
  password_hash!: string;

  @Column({ type: "text", nullable: true })
  password_salt?: string;

  @Column({ type: "text", unique: true, nullable: true })
  auth_token?: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone?: string;

  @Column({ type: "jsonb", default: () => "'{}'" })
  address!: object;

  @Column({ type: "boolean", default: false })
  is_verified!: boolean;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ type: "enum", enum: UserRole, nullable: false })
  role!: UserRole;

  @Column({ type: "jsonb", default: () => "'{}'" })
  permissions!: object;

  @Column({ type: "int", default: 0 })
  reading_goal!: number;

  @Column({ type: "int", default: 0 })
  books_read!: number;

  @Column({ type: "enum", enum: ChurchRole, nullable: true })
  church_role?: ChurchRole;

  @Column({ type: "text", nullable: true })
  profile_picture?: string;

  @Column({ type: "timestamp", nullable: true })
  last_login?: Date;

  @CreateDateColumn()
  registered_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ type: "jsonb", default: () => "'{}'" })
  preferences!: object;
}
