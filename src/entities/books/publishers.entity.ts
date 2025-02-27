import { Entity, Column, BaseEntity } from "typeorm";

@Entity("publishers")
export class Publisher extends BaseEntity {
  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  country?: string;

  @Column({ type: "text", nullable: true })
  website?: string;
}
