import express from "express";
import PostgresStrategy from "../../../database/strategies/postgres/postgres.strategy";
import { AppDataSource } from "../../../database/dataSource";
import { UserRoleType } from "../../../entities/users/user_roles.entity";
import { BookController } from "../../controllers/books/book.controller";
import Auth from "../../middleware/Auth";

const router = express.Router();

const repositories = {
  book: PostgresStrategy.createRepository(AppDataSource, "Book"),
  author: PostgresStrategy.createRepository(AppDataSource, "Author"),
  publisher: PostgresStrategy.createRepository(AppDataSource, "Publisher"),
  user: PostgresStrategy.createRepository(AppDataSource, "UserEntity"),
};

const bookController = new BookController();

router.get("/", Auth.isAuthenticated, bookController.getBooks);
router.get("/:book_id", Auth.isAuthenticated, bookController.getBookById);

router.post(
  "/",
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN]),
  bookController.createBook,
);

router.put(
  "/:book_id",
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN]),
  bookController.updateBook,
);

router.delete(
  "/:book_id",
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.SUPER_ADMIN]),
  bookController.deleteBook,
);

export default router;
