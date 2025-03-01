import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ValueTransformer } from "typeorm";
import { IAddress } from "../../api/interfaces/IAddress";
import { UserRoleType } from "./user_roles.entity";

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

export enum MembershipType {
  VISITOR = "visitor",
  MEMBER = "member",
  ACTIVE_MEMBER = "active_member",
  VOLUNTEER = "volunteer",
  LEADER = "leader",
  MINISTER = "minister",
  STAFF = "staff",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export const AddressTransformer: ValueTransformer = {
  to: (value: IAddress | null) => (value ? JSON.stringify(value) : "{}"),
  from: (value: string | null) => (value ? JSON.parse(value) : {}),
};

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "text", nullable: true })
  password_salt?: string | null;

  @Column({ type: "text", unique: true, nullable: true })
  auth_token?: string | null;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone?: string | null;

  @Column({
    type: "jsonb",
    default: () => "'{}'",
    transformer: AddressTransformer,
  })
  address!: IAddress;

  @Column({ type: "boolean", default: false })
  is_verified!: boolean;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({
    type: "enum",
    enum: UserRoleType,
    nullable: false,
    default: UserRoleType.USER,
  })
  role!: UserRoleType;

  @Column({ type: "jsonb", default: () => "'{}'" })
  permissions!: Record<string, any>;

  @Column({ type: "int", default: 0 })
  reading_goal!: number;

  @Column({ type: "int", default: 0 })
  books_read!: number;

  @Column({ type: "enum", enum: ChurchRole, nullable: true })
  church_role?: ChurchRole | null;

  @Column({ type: "enum", enum: MembershipType, nullable: true })
  membership_type?: MembershipType | null;

  @Column({ type: "uuid", unique: true, nullable: false })
  auth_id!: string;

  @Column({ type: "text", nullable: true })
  profile_picture?: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  whatsapp?: string | null;

  @Column({ type: "text", nullable: true })
  instagram?: string | null;

  @Column({ type: "text", nullable: true })
  facebook?: string | null;

  @Column({ type: "text", nullable: true })
  telegram?: string | null;

  @Column({ type: "text", nullable: true })
  website?: string | null;

  @Column({ type: "timestamp", nullable: true })
  last_login?: Date | null;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at?: Date | null;

  @Column({ type: "jsonb", default: () => "'{}'" })
  preferences!: Record<string, any>;
}
