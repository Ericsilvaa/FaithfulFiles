
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IsEmail, MinLength } from "class-validator";
import AddressEntity from "./address.entity";
import { Role } from "./roles.entity";


@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @MinLength(2, { message: "Um nome precisa no mínimo 2 caracteres" })
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(4, { message: "Senha maior que 4" })
  password_hash: string;

  @Column()
  token: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn()
  role: Role;


  @OneToOne(() => AddressEntity, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  address?: AddressEntity;



  constructor(
    username: string,
    password_hash: string,
    email: string,
    role: Role,
    token: string,
  ) {
    this.username = username;
    this.password_hash = password_hash;
    this.email = email;
    this.role = role;
    this.token = token;
  }

  static createUser(user: UserEntity): UserEntity {
    return new UserEntity(
      user.username,
      user.password_hash,
      user.email,
      user.role,
      user.token,
    );
  }
}