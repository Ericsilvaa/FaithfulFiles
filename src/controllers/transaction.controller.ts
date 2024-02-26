import { Repository } from "typeorm"
import { BookTransaction } from "../entities/mongodb/bookTransaction.entity"
import { Request, Response } from "express"

type TBookTransaction = Omit<BookTransaction, 'id'>
type TBookData = {
  userId: string
  bookId: string
}


export default class TransactionBookController {

  constructor(private postgresStrategy: any, private mongoDBStrategy: any) { }


  private async connect() {
    await this.postgresStrategy.connect()
    await this.mongoDBStrategy.connect()
  }

  private createTransaction(data: TBookTransaction) {

  }

  async createConnection() {
    await this.connect()
  }


  // create book transaction
  // receives 
  async createBookTransaction() {
    // url: /books/transactions?userId=1&bookId=2

    // try {
    // const { user, book } = await this.postgresStrategy.checktUserAndBookExist(userId, bookId)

    //   // if (user && book) {
    //   //   if (book.available === true) {
    //       // 1. crio uma entity de transaction
    //       const newTransaction = BookTransaction
    //       // 2. crio uma transaction
    //       // 3. atualizo os dados do livro
    //     }
    //     // retornar que o livro está indisponivel
    //   }
    //   // retorno que deu não encontrado!

    // } catch (error) {

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