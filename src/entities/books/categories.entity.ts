import { Entity, Column, BaseEntity } from "typeorm";

@Entity("categories")
export class Category extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;
}
