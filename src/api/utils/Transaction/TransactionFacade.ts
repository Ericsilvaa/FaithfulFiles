// istanbul ignore next
import { ObjectLiteral } from "typeorm";
import TransactionBuilder from "./TransactionBuilder";
<<<<<<< HEAD:src/utils/Transaction/TransactionFacade.ts
import { BookTransaction } from "../../config/db/mongodb/bookTransaction.entity";
=======
import { BookTransaction } from "../../../database/entities/mongodb/bookTransaction.entity";
>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/api/utils/Transaction/TransactionFacade.ts

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
