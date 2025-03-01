import express from "express";
import Auth from "../middleware/Auth";
import { AppDataSource } from "../../database/dataSource";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import { BookController } from "../controllers/books/book.controller";
import { UserRoleType } from "../../entities/users/user_roles.entity";

const router = express.Router();

// ✅ Initialize Repositories & Controller
const bookRepository = PostgresStrategy.createRepository(AppDataSource, "Book");
const authorRepository = PostgresStrategy.createRepository(
  AppDataSource,
  "Author",
);
const publisherRepository = PostgresStrategy.createRepository(
  AppDataSource,
  "Publisher",
);
const userRepository = PostgresStrategy.createRepository(
  AppDataSource,
  "UserEntity",
);

const context = new ContextStrategy(new PostgresStrategy(bookRepository));
const bookController = new BookController();

// ✅ Routes
router.get(
  "/",
  Auth.isAuthenticated,
  Auth.authorizeRoles([
    UserRoleType.ADMIN,
    UserRoleType.USER,
    UserRoleType.MODERATOR,
  ]),
  (req, res) => bookController.getBooks(req, res),
);

// router.get(
//   "/filter",
//   Auth.isAuthenticated,
//   Auth.authorizeRoles([
//     UserRoleType.ADMIN,
//     UserRoleType.USER,
//     UserRoleType.MODERATOR,
//   ]),
//   (req, res) => bookController.getBookByFilters(req, res),
// );

router.get(
  "/:book_id",
  Auth.isAuthenticated,
  Auth.authorizeRoles([
    UserRoleType.ADMIN,
    UserRoleType.USER,
    UserRoleType.MODERATOR,
  ]),
  (req, res) => bookController.getBookById(req, res),
);

router.post(
  "/",
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.MODERATOR]),
  (req, res) => bookController.createBook(req, res),
);

router.put(
  "/:book_id",
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.MODERATOR]),
  (req, res) => bookController.updateBook(req, res),
);

router.delete(
  "/:book_id",
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.MODERATOR]),
  (req, res) => bookController.deleteBook(req, res),
);

export default router;
