import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ObjectLiteral } from 'typeorm';
import { Book } from './book.entity';
import { IsNotEmpty } from 'class-validator';
import { Permissions } from './permissions.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Permissions, permission => permission.role)
  permissions?: ObjectLiteral[];

  @OneToMany(() => UserEntity, user => user.role)
  users!: UserEntity[];


  constructor(name: string) {
    this.name = name;
  }
}