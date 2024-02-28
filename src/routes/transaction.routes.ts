import express, { Router } from "express";
import MongoDBStrategy from "../config/strategies/mongodb/mongodb.strategy";
import TransactionFacade from "../controllers/mongodb/TransactionFacade";
import TransactionBookController from "../controllers/transaction.controller";
import { dbDataSourceMongo, dbDataSourcePostgres } from "../config/db/dataSource";

const router = Router()

const transactionBook = new TransactionBookController(dbDataSourcePostgres)

router.post('/transaction', transactionBook.createBookTransaction.bind(transactionBook))



export default router;
