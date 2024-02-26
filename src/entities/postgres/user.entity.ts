
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

  @Column({ nullable: true })
  token?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @ManyToOne(() => Role, role => role.users) // Define a relação muitos para um
  @JoinColumn()
  role!: Role; // Adiciona uma propriedade role na entidade UserEntity

  @OneToOne(() => AddressEntity, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  address?: AddressEntity;


  constructor(
    username: string,
    password_hash: string,
    email: string,
    token?: string,
    phone?: string
  ) {
    this.email = email;
    this.phone = phone;
    this.username = username;
    this.password_hash = password_hash;
    this.token = token;
  }
}