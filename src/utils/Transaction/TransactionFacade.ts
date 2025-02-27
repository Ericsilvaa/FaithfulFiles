// istanbul ignore next
import { ObjectLiteral } from "typeorm";
import TransactionBuilder from "./TransactionBuilder";
import { BookTransaction } from "../../config/db/mongodb/bookTransaction.entity";

export default class TransactionFacade {
  static Transaction(user: ObjectLiteral, book: ObjectLiteral) {
    const Transaction = new TransactionBuilder()
      .setUser(user)
      .setBook(book)
      .startAndFinishDate()
      .build();

    return BookTransaction.createBookTransaction(Transaction);
  }
}
