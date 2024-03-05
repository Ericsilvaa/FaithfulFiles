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
const repositoryUser = PostgresStrategy.createRepository(dbDataSourcePostgres, 'UserEntity')
const context = new ContextStrategy(new PostgresStrategy(repository))
const bookController = new BookController(context, repositoryAuthor, repositoryPublisher, repositoryUser);

router.get('/', Auth.isMember, roles(["admin", "default", "owner"]), bookController.getAllBooks.bind(bookController))
router.get('/filter', Auth.isMember, roles(["admin", "default", "owner"]), bookController.getBookByFilters.bind(bookController))
router.get('/:book_id', Auth.isMember, roles(["admin", "default", "owner"]), bookController.getBookById.bind(bookController))

router.post('/add', Auth.isMember, roles(["admin", "owner"]), bookController.createBook.bind(bookController))
router.put('/update/:book_id', Auth.isMember, roles(["admin", "owner"]), bookController.updateBook.bind(bookController))
router.delete('/remove/:book_id', Auth.isMember, roles(["admin", "owner"]), bookController.deleteBook.bind(bookController))

export default router;
