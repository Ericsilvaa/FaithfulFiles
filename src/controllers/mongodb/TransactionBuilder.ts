import { ObjectLiteral, Repository } from "typeorm"

export default class TransactionBuilder {
  private transaction: any = {}
  private transactionRepository: any = {}
  constructor() { }

  // abrir connexão com db
  // fechar connexao com db
  createRepository(repository: Repository<ObjectLiteral>) {
    this.transactionRepository = repository
    return this
  }

  setUser(user: any) {

    return this
  }
  setBook(book: any) {

    return this
  }

  verifyBookAvailable() {

    return this
  }

  generateTransactionId() {

    return this
  }

  build() {
    return this.transaction
  }

}