import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { Request, Response } from "express";
import TransactionFacade from "./mongodb/TransactionFacade";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { ObjectId } from "mongodb";

export default class TransactionBookController {
  constructor(
    private postgresDb: DataSource,
    private mongoDb: ContextStrategy
  ) { }

  // @TransactionDb
  async getAllTransation(req: Request, res: Response) {
    try {
      await this.mongoDb.connect();
      const transactions = await this.mongoDb.findAll({});
      await this.mongoDb.disconnect();
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({ error, message: "drop on catch" });
    }
  }

  // decorator
  // @TransactionDb
  async createBookTransaction(req: Request, res: Response) {
    // url: /books/transactions?userId=1&bookId=2
    const { bookId } = req.query;
    const { email } = req.user

    try {
      const { user, book } = await this.checktUserAndBookExist(email,
        Number(bookId)
      );

      if (user && book) {
        if (book.available === true) {
          const transaction = TransactionFacade.Transaction(user, book);

          await this.mongoDb.connect();
          const newTransaction = await this.mongoDb.save(transaction);
          await this.mongoDb.disconnect();

          if (!transaction) {
            res.end("Transaction Failed");
          }

          const update = await this.updatedUserAndBook(newTransaction);

          res
            .status(200)
            .json({
              success: true,
              data: newTransaction,
              transaction_id: newTransaction._id,
            });
        } else {
          res.send("Livro está indisponivel no momento!");
        }
      }
    } catch (error) {
      return res.status(500).json({ error, message: "drop on catch" });
    }
  }

  private async checktUserAndBookExist(email: string, bookId: number) {
    const [user, book] = await Promise.all([
      await this.postgresDb
        .getRepository("UserEntity")
        .findOne({ where: { email } }),
      await this.postgresDb
        .getRepository("Book")
        .findOne({ where: { id: bookId } }),
    ]);
    return { user, book };
  }

  private async updatedUserAndBook({
    _id,
    user,
    book,
  }: {
    _id: ObjectId;
    user: ObjectLiteral;
    book: ObjectLiteral;
  }) {
    try {
      const userUpdated = await this.postgresDb
        .getRepository("UserEntity")
        .update(+user.id, {
          transactions: { account: () => "account + 1", current_transaction: _id },
        });

      const bookUpdated = await this.postgresDb
        .getRepository("Book")
        .update(+book.id, {
          loan_count: () => "loan_count + 1",
          available: false,
        });

      return { userUpdated, bookUpdated }
    } catch (error) {
      console.log('error no transaction updated')
    }
  }
}

// receive data: userId and bookID
// verify if user exists in database
// verify if book exists and be available in database
