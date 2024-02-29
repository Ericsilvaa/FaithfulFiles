import { DataSource, ObjectLiteral } from "typeorm";
import ContextStrategy from "../../config/strategies/base/context.strategy";
import TransactionBuilder from "./TransactionBuilder";
import { BookTransaction } from "../../entities/mongodb/bookTransaction.entity";

export default class TransactionFacade {
  static async Transaction(user: ObjectLiteral, book: ObjectLiteral) {
    const TransactionBook = new TransactionBuilder()
      .setUser(user)
      .setBook(book)
      .startDate()
      .endDate()
      .build()

    return BookTransaction.createBookTransaction(TransactionBook)

  }
}