import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { RoleEntity } from "./roles.entity";

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => RoleEntity, (role) => role.permissions)
  role?: RoleEntity;

  constructor(name: string) {
    this.name = name;
  }
}
