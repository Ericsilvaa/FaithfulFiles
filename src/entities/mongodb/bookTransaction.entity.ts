import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class BookTransaction {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  userId!: string;

  @Column()
  bookId!: string;

  @Column()
  transactionDate!: Date;
}