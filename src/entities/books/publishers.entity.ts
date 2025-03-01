import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity("publishers")
export class Publisher extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") // 🔹 ID gerado automaticamente
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  country?: string;

  @Column({ type: "text", nullable: true })
  website?: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
