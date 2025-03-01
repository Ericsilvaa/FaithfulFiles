import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { User } from "./users.entity";

export enum UserRoleType {
  USER = "user",
  MODERATOR = "moderator",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

@Entity("user_roles")
@Unique(["user", "role"]) // 🚀 Garante que não existam roles duplicadas por usuário
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 📌 Relacionamento com `User`
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  // 📌 Enum para definir papéis adicionais
  @Column({ type: "enum", enum: UserRoleType, nullable: false })
  role!: UserRoleType;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
}
