import TransactionBuilder from "./TransactionBuilder";

export default class TransactionFacade {
  static Transaction(user: any, book: any, db: any) {
    const transactionBuilder = new TransactionBuilder()
      .createRepository({})
      .setUser(user)
      .setBook(book)
      .generateTransactionId()
      .build()
  }
}