import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Role } from './roles.entity';

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => Role, role => role.permissions)
  role?: Role;

  constructor(name: string) {
    this.name = name;
  }
}