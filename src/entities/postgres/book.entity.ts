import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author } from './author.entity';
import { Publisher } from './publisher.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  page_count: number;

  @ManyToOne(() => Author, { nullable: true })
  author?: Author;

  @Column()
  description: string;

  @ManyToOne(() => Publisher, { nullable: true })
  publisher?: Publisher;

  @Column({ default: true })
  available: boolean;

  @Column({ default: 0 })
  loan_count: number;

  constructor(title: string, page_count: number, description: string, available: boolean, loan_count: number) {
    this.title = title;
    this.page_count = page_count;
    this.description = description;
    this.available = available;
    this.loan_count = loan_count;
  }
}