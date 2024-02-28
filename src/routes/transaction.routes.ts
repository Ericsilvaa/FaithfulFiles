import express, { Router } from "express";
import MongoDBStrategy from "../config/strategies/mongodb/mongodb.strategy";
import TransactionFacade from "../controllers/mongodb/TransactionFacade";
import TransactionBookController from "../controllers/transaction.controller";
import { dbDataSourceMongo, dbDataSourcePostgres } from "../config/db/dataSource";
import ContextStrategy from "../config/strategies/base/context.strategy";

const router = Router()

const contextMongoDb = new ContextStrategy(new MongoDBStrategy(dbDataSourceMongo))

const transactionBook = new TransactionBookController(dbDataSourcePostgres, contextMongoDb)

router.get('/transactions', (req, res) => {
  console.log('transactions')

  res.send('transactions')
})

router.get('/transation/all', transactionBook.getAllTransation.bind(transactionBook))
router.post('/transaction', transactionBook.createBookTransaction.bind(transactionBook))



export default router;
