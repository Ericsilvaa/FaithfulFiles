import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ObjectLiteral,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Permissions } from "./permissions.entity";
import { User } from "../users/users.entity";

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Permissions, (permission) => permission.role)
  permissions?: ObjectLiteral[];

  @OneToMany(() => User, (user) => user.role)
  users: User[] = [];

  constructor(name: string, users: User[]) {
    this.name = name;
    this.users = users;
  }

  static createRole(role: RoleEntity): RoleEntity {
    return new RoleEntity(role.name, role.users);
  }
}
