
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class BookTransaction {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  userId: string;

  @Column()
  bookId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  returned: boolean;

  constructor(userId: string, bookId: string, startDate: Date, endDate: Date, returned: boolean) {
    this.userId = userId;
    this.bookId = bookId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.returned = returned;
  }
}