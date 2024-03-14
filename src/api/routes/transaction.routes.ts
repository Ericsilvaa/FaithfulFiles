import { Router } from "express";

import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";
import { isAddress } from "../middleware/existAddress";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import TransactionBookController from "../controllers/transaction.controller";
import MongoDBStrategy from "../../database/strategies/mongodb/mongodb.strategy";
import { dbDataSourceMongo, dbDataSourcePostgres } from "../../database/db/dataSource";




const router = Router()

const contextMongoDb = new ContextStrategy(new MongoDBStrategy(dbDataSourceMongo))
const transactionBook = new TransactionBookController(dbDataSourcePostgres, contextMongoDb)

router.use(Auth.isMember)

router.get('/', (req, res) => {
  console.log('transactions')

  res.send('transactions')
})

router.post('/register', roles(['admin', 'default']), isAddress, transactionBook.createBookTransaction.bind(transactionBook))
router.get('/all', roles(['admin']), transactionBook.getAllTransation.bind(transactionBook))

export default router;
