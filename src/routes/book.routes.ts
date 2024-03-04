import express from "express"

import Auth from "../middleware/isAuth"
import { roles } from "../middleware/roles"

import BookController from "../controllers/book.controller"
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy"
import { dbDataSourcePostgres } from "../config/db/dataSource"
import ContextStrategy from "../config/strategies/base/context.strategy"



// 'htttp =? /library/books/'
const router = express.Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Book')
const repositoryAuthor = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Author')
const repositoryPublisher = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Publisher')
const context = new ContextStrategy(new PostgresStrategy(repository))
const bookController = new BookController(context, repositoryAuthor, repositoryPublisher);

router.get('/', Auth.isMember, roles(["admin", "default"]), bookController.getAllBooks.bind(bookController))
router.get('/filter', Auth.isMember, roles(["admin", "default"]), bookController.getBookByFilters.bind(bookController))
router.get('/:book_id', Auth.isMember, roles(["admin", "default"]), bookController.getBookById.bind(bookController))

router.post('/add', Auth.isMember, roles(["admin"]), bookController.createOrUpdateBook.bind(bookController))
router.put('/update/:book_id', Auth.isMember, roles(["admin"]), bookController.createOrUpdateBook.bind(bookController))

export default router;
