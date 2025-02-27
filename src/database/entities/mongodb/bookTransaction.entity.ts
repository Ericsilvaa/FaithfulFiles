
import { Entity, ObjectIdColumn, ObjectId, Column, ObjectLiteral, Transaction } from 'typeorm';

@Entity()
export class BookTransaction {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  user: ObjectLiteral;

  @Column()
  book: ObjectLiteral;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  returned?: boolean;

  constructor(user: ObjectLiteral, book: ObjectLiteral, startDate: Date, endDate: Date, returned?: boolean) {
    this.user = user;
    this.book = book;
    this.startDate = startDate;
    this.endDate = endDate;
    this.returned = returned;
  }

  static createBookTransaction(transaction: ObjectLiteral): BookTransaction {
    return new BookTransaction(
      transaction.user,
      transaction.book,
      transaction.startDate,
      transaction.endDate,
      transaction.returned,
    );
  }
}