import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity("members")
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // 📌 Relacionamento com `User` (um usuário pode ser um membro)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  // 📌 Identificador da igreja (obrigatório)
  @Column({ type: "uuid", nullable: false })
  church_id!: string;

  // 📌 Data de entrada (agora usando `CreateDateColumn` para ser automático)
  @CreateDateColumn({ type: "timestamp" })
  joined_at!: Date;

  // 📌 Status do membro
  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  // 📌 Notas adicionais sobre o membro (opcional)
  @Column({ type: "text", nullable: true })
  notes?: string;
}
