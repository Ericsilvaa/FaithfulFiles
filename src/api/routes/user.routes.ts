import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
} from "typeorm";
import bcrypt from "bcrypt";
import { UserRoleType } from "../../entities/users/user_roles.entity";

// ✅ User Status Enum
export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  BANNED = "banned",
}

// ✅ Church Role Enum
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

// ✅ Membership Type Enum
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

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email!: string;

  @Column({ type: "text", nullable: false, select: false })
  passwordHash!: string;

  @Column({ type: "text", nullable: true, select: false })
  passwordSalt?: string;

  @Column({ type: "text", unique: true, nullable: true })
  authToken?: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  phone?: string;

  // ✅ Address stored as JSONB
  @Column({ type: "jsonb", default: {} })
  address!: Record<string, any>;

  // ✅ User Status & Permissions
  @Column({ type: "boolean", default: false })
  isVerified!: boolean;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "enum", enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ type: "enum", enum: UserRoleType, default: UserRoleType.USER })
  role!: UserRoleType;

  @Column({ type: "jsonb", default: {} })
  permissions!: Record<string, any>;

  // ✅ Reading progress
  @Column({ type: "int", default: 0 })
  readingGoal!: number;

  @Column({ type: "int", default: 0 })
  booksRead!: number;

  // ✅ Church Role & Membership Type
  @Column({ type: "enum", enum: ChurchRole, nullable: true })
  churchRole?: ChurchRole;

  @Column({
    type: "enum",
    enum: MembershipType,
    default: MembershipType.MEMBER,
  })
  membershipType!: MembershipType;

  // ✅ Profile & Social Media
  @Column({ type: "text", nullable: true })
  profilePicture?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  whatsapp?: string;

  @Column({ type: "text", nullable: true })
  instagram?: string;

  @Column({ type: "text", nullable: true })
  facebook?: string;

  @Column({ type: "text", nullable: true })
  telegram?: string;

  @Column({ type: "text", nullable: true })
  website?: string;

  // ✅ Time Tracking
  @Column({ type: "timestamp", nullable: true })
  lastLogin?: Date;

  @CreateDateColumn({ type: "timestamp" })
  registeredAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt?: Date;

  // ✅ User Preferences
  @Column({ type: "jsonb", default: {} })
  preferences!: Record<string, any>;

  // 🔒 Password Hashing Before Insert or Update
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.passwordHash) {
      const saltRounds = 10;
      this.passwordSalt = await bcrypt.genSalt(saltRounds);
      this.passwordHash = await bcrypt.hash(
        this.passwordHash,
        this.passwordSalt,
      );
    }
  }
}
