import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { BookCopyEntity } from "../books/book_copy.entity";

@Entity()
export class LoanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => BookCopy, (bookCopy) => bookCopy.id)
  bookCopy: BookCopyEntity;

  @Column()
  dueDate: Date;
}
