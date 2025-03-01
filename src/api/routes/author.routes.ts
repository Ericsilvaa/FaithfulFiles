import express, { Router } from "express";

import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";
import { dbDataSourcePostgres } from "../../database/dataSource";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import AuthorController from "../controllers/author.controller";

// 'htttp =? /library/author'
const router = express.Router();

const repository = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "Author",
);
const context = new ContextStrategy(new PostgresStrategy(repository));
const authorController = new AuthorController(context);
// const repositoryRole = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
// (repositoryRole as Repository<Role>)

router.use(Auth.isMember, roles(["admin"]));

router.get("/", authorController.getAllAuthors.bind(authorController));
router.get(
  "/:author_id",
  authorController.getAuthorById.bind(authorController),
);
// router.get('/filter', authorController.getAuthorByFilters.bind(authorController))

router.post(
  "/add",
  authorController.createOrUpdateAuthor.bind(authorController),
);
router.put(
  "/updated/:author_id",
  authorController.createOrUpdateAuthor.bind(authorController),
);

export default router;
