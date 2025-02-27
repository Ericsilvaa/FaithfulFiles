import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ObjectLiteral,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Permissions } from "./permissions.entity";
import { UserEntity } from "../users/user.entity";

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Permissions, (permission) => permission.role)
  permissions?: ObjectLiteral[];

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[] = [];

  constructor(name: string, users: UserEntity[]) {
    this.name = name;
    this.users = users;
  }

  static createRole(role: RoleEntity): RoleEntity {
    return new RoleEntity(role.name, role.users);
  }
}
