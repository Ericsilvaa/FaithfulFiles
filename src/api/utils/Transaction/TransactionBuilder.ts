import { ObjectLiteral } from "typeorm";

export default class TransactionBuilder {
  private transaction: ObjectLiteral = {};
  constructor() {}

  setUser(user: ObjectLiteral) {
    this.transaction.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return this;
  }

  setBook(book: ObjectLiteral) {
    this.transaction.book = {
      id: book.id,
      title: book.title,
    };
    return this;
  }

  startAndFinishDate() {
    this.transaction.startDate = new Date();

    this.transaction.endDate = new Date(
      this.transaction.startDate.getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    return this;
  }

  build() {
    return this.transaction;
  }
}
