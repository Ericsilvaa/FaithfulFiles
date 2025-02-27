import { Router } from "express";

import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";
import { isAddress } from "../middleware/existAddress";
<<<<<<< HEAD:src/routes/transaction.routes.ts

import {
  dbDataSourceMongo,
  dbDataSourcePostgres,
} from "../config/db/dataSource";
import MongoDBStrategy from "../config/strategies/mongodb/mongodb.strategy";
import ContextStrategy from "../config/strategies/base/context.strategy";

import TransactionFacade from "../utils/Transaction/TransactionFacade";
=======
import ContextStrategy from "../../database/strategies/base/context.strategy";
>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/api/routes/transaction.routes.ts
import TransactionBookController from "../controllers/transaction.controller";
import MongoDBStrategy from "../../database/strategies/mongodb/mongodb.strategy";
import { dbDataSourceMongo, dbDataSourcePostgres } from "../../database/db/dataSource";



const router = Router();

const contextMongoDb = new ContextStrategy(
  new MongoDBStrategy(dbDataSourceMongo)
);
const transactionBook = new TransactionBookController(
  dbDataSourcePostgres,
  contextMongoDb
);

router.use(Auth.isMember);

router.get("/", (req, res) => {
  console.log("transactions");

  res.send("transactions");
});

router.post(
  "/register",
  roles(["admin", "default"]),
  isAddress,
  transactionBook.createBookTransaction.bind(transactionBook)
);
router.get(
  "/all",
  roles(["admin"]),
  transactionBook.getAllTransation.bind(transactionBook)
);

export default router;
