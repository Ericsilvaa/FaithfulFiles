import express from "express";
import authRoute from './auth.routes'
import bookRoute from './book.routes'

import PostgresStrategy from "../config/strategies/postgres/postgres.strategy";
import { dbDataSourceMongo, dbDataSourcePostgres } from "../config/db/dataSource";
import MongoDBStrategy from "../config/strategies/mongodb/mongodb.strategy";
import TransactionBookController from "../controllers/transaction.controller";

const router = (app: express.Router) => {

  async function dbConnection() {
    const connection = PostgresStrategy.connect()
    return connection
  }
  dbConnection()

  app.use('/library/auth', authRoute)
  app.use('/library/book', bookRoute)


}

export default router;
