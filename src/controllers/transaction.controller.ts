import { DataSource, Repository } from "typeorm"
import { BookTransaction } from "../entities/mongodb/bookTransaction.entity"
import { Request, Response } from "express"
import TransactionFacade from "./mongodb/TransactionFacade"
import { dbDataSourceMongo } from "../config/db/dataSource"
import ContextStrategy from "../config/strategies/base/context.strategy"
import TransactionDb from "../decorators/transaction.decorator"

type TBookTransaction = Omit<BookTransaction, 'id'>
type TBookData = {
  userId: string
  bookId: string
}


export default class TransactionBookController {

  constructor(private postgresDb: DataSource, private mongoDb: ContextStrategy) { }

  private createTransaction(data: TBookTransaction) {

  }
  // @TransactionDb
  async getAllTransation(req: Request, res: Response) {
    try {
      await this.mongoDb.connect()
      const transactions = await this.mongoDb.findAll({})
      await this.mongoDb.disconnect()
      return res.status(200).json(transactions);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }

  // decorator
  // @TransactionDb
  async createBookTransaction(req: Request, res: Response) {
    // url: /books/transactions?userId=1&bookId=2
    const { userId, bookId } = req.query

    try {
      const { user, book } = await this.checktUserAndBookExist(Number(userId), Number(bookId))

      if (user && book) {
        if (book.available === true) {
          const transaction = await TransactionFacade.Transaction(user, book)

          await this.mongoDb.connect()
          const newTransaction = await this.mongoDb.save(transaction)
          await this.mongoDb.disconnect()

          if (!transaction) {
            res.end('Transaction Failed')
          }

          res.status(200).json({ success: true, data: newTransaction, transaction_id: newTransaction._id })
        } else {
          res.send('Livro está indisponivel no momento!')
        }
      }

    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }


  private async checktUserAndBookExist(userId: number, bookId: number) {
    const [user, book] = await Promise.all([
      await this.postgresDb.getRepository('UserEntity').findOne({ where: { id: userId } }),
      await this.postgresDb.getRepository('Book').findOne({ where: { id: bookId } })
    ])


    return { user, book }
  }

}

// receive data: userId and bookID
// verify if user exists in database
// verify if book exists and be available in database


