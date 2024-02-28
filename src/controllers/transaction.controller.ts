import { Repository } from "typeorm"
import { BookTransaction } from "../entities/mongodb/bookTransaction.entity"
import { Request, Response } from "express"
import TransactionFacade from "./mongodb/TransactionFacade"

type TBookTransaction = Omit<BookTransaction, 'id'>
type TBookData = {
  userId: string
  bookId: string
}


export default class TransactionBookController {

  constructor(private postgresDb: any) { }


  private async connect() {
    // await this.postgresStrategy.connect()
    // await this.mongoDBStrategy.connect()
  }

  private createTransaction(data: TBookTransaction) {

  }

  async createConnection() {
    await this.connect()
  }

  async createBookTransaction(req: Request, res: Response) {
    // url: /books/transactions?userId=1&bookId=2
    const { userId, bookId } = req.query


    try {
      const transaction = TransactionFacade.Transaction('user', 'book,' 'mongoConncation')

      // const { user, book } = await this.postgresStrategy.checktUserAndBookExist(userId, bookId)

      // if (user && book) {
      //   if (book.available === true) {
      // 1. crio uma entity de transaction
      const newTransaction = BookTransaction
      // 2. crio uma transaction
      // 3. atualizo os dados do livro
    }
        // retornar que o livro está indisponivel
      }
  // retorno que deu não encontrado!

} catch (error) { }

  }


  // transform data that we received

  // necessary connection with database of mongodb

  // return transaction completed

  // return this
  // }

}


// receive data: userId and bookID
// verify if user exists in database
// verify if book exists and be available in database


// async checktUserAndBookExist(userId: any, bookId: any) {
//   const [user, book] = await Promise.all([
//     await this.repositoryUser.findOne({ where: { id: userId } }),
//     await this.repository.findOne({ where: { id: bookId } })
//   ])

//   return { user, book }
// }

// this.repositoryBook = dbInitialized.getRepository('Book')
// this.UserEntity = dbInitialized.getRepository('UserEntity')

// this.entityRepository.forEach((entity) => {
//   (PostgresStrategy.prototype as any)[entity] = dbInitialized.getRepository(entity)
// })