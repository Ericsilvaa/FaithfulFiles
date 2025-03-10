import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("authors")
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  country?: string;

  @Column({ type: "date", nullable: true })
  birth_date?: Date;

  @Column({ type: "date", nullable: true })
  death_date?: Date;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
