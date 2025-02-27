<<<<<<< HEAD:src/utils/Transaction/TransactionBuilder.ts
import { ObjectLiteral } from "typeorm";
import { BookTransaction } from "../../config/db/mongodb/bookTransaction.entity";
=======
import { ObjectLiteral, } from "typeorm"

>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/api/utils/Transaction/TransactionBuilder.ts

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
