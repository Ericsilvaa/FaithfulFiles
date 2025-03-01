import express from "express";

import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";
import { dbDataSourcePostgres } from "../../database/dataSource";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import BookController from "../controllers/book.controller";

// 'htttp =? /library/books/'
const router = express.Router();

const repository = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "Book",
);
const repositoryAuthor = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "Author",
);
const repositoryPublisher = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "Publisher",
);
const repositoryUser = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "UserEntity",
);
const context = new ContextStrategy(new PostgresStrategy(repository));
const bookController = new BookController(
  context,
  repositoryAuthor,
  repositoryPublisher,
  repositoryUser,
);

router.get(
  "/",
  Auth.isMember,
  roles(["admin", "default", "owner"]),
  bookController.getAllBooks.bind(bookController),
);
router.get(
  "/filter",
  Auth.isMember,
  roles(["admin", "default", "owner"]),
  bookController.getBookByFilters.bind(bookController),
);
router.get(
  "/:book_id",
  Auth.isMember,
  roles(["admin", "default", "owner"]),
  bookController.getBookById.bind(bookController),
);

router.post(
  "/add",
  Auth.isMember,
  roles(["admin", "owner"]),
  bookController.createBook.bind(bookController),
);
router.put(
  "/update/:book_id",
  Auth.isMember,
  roles(["admin", "owner"]),
  bookController.updateBook.bind(bookController),
);
router.delete(
  "/remove/:book_id",
  Auth.isMember,
  roles(["admin", "owner"]),
  bookController.deleteBook.bind(bookController),
);

export default router;
