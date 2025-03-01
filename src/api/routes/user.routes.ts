import { Router } from "express";

import Auth from "../middleware/isAuth";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import UserController from "../controllers/user.controller";
import { dbDataSourcePostgres } from "../../database/dataSource";

const router = Router();

const repository = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "UserEntity",
);
const context = new ContextStrategy(new PostgresStrategy(repository));
const userController = new UserController(context);

router.use(Auth.isMember);
router.get("/", userController.getCurrentUser.bind(userController));

router.put("/", userController.updateUser.bind(userController));

export default router;
