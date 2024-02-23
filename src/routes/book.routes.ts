import express from "express"


import BookController from "../controllers/book.controller"
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy"
import { dbDataSourcePostgres } from "../config/db/dataSource"
import ContextStrategy from "../config/strategies/base/context.strategy"



// 'htttp =? /library/books/'
const router = express.Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Book')
const context = new ContextStrategy(new PostgresStrategy(repository))
const bookController = new BookController(context);

router.get('/', bookController.getAllBooks.bind(bookController))
router.get('/:book_id', bookController.getBookById.bind(bookController))
router.post('/add', bookController.createBook.bind(bookController))
router.put('/updated/:book_id', bookController.createBook.bind(bookController))

export default router;
