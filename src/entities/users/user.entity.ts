import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IsEmail, MinLength } from "class-validator";
import { EnumBrazilianStates } from "../../utils/enums/AddressEnum";
import { ObjectId } from "mongodb";
import { IAddress } from "../../interfaces/IAddress";
import { BookEntity } from "../books/book.entity";
import { RoleEntity } from "../permissions/roles.entity";

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

  @Column({ type: "json", nullable: true, default: { account: 0 } })
  transactions?: { account: number; current_transaction: ObjectId };

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn()
  role: RoleEntity;

  @Column({ type: "json", nullable: true })
  address?: IAddress;

  @OneToMany(() => BookEntity, (book) => book.owner, { nullable: true }) // Relacionamento OneToMany com Book, opcional
  owner_book?: BookEntity[];

  constructor(
    username: string,
    password_hash: string,
    email: string,
    role: RoleEntity,
    token: string,
    address?: {
      cep: string;
      logradouro: string;
      bairro: string;
      localidade: string;
      complemento?: string;
      uf: EnumBrazilianStates;
      ibge?: string;
      gia?: string;
      ddd?: string;
      siafi?: string;
    },
    transactions?: { account: number; current_transaction: ObjectId },
  ) {
    this.username = username;
    this.password_hash = password_hash;
    this.email = email;
    this.role = role;
    this.token = token;
    this.address = address;
    this.transactions = transactions;
  }

  static createUser(user: UserEntity): UserEntity {
    return new UserEntity(
      user.username,
      user.password_hash,
      user.email,
      user.role,
      user.token,
      user.address,
      user.transactions,
    );
  }
}

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @OneToMany(() => LibraryFeedback, (feedback) => feedback.user)
//   feedbacks: LibraryFeedback[];
// }
