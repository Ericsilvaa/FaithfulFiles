import { DataSource, ObjectLiteral } from "typeorm";
import ContextStrategy from "../../config/strategies/base/context.strategy";
import TransactionBuilder from "./TransactionBuilder";

export default class TransactionFacade {
  static async Transaction(user: ObjectLiteral, book: ObjectLiteral) {
    return new TransactionBuilder()
      .setUser(user)
      .setBook(book)
      .startDate()
      .endDate()
      .build()
  }
}