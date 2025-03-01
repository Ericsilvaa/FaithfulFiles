import { Router } from "express";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import AuthController from "../controllers/auth.controller";
import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { UserRole } from "../../entities/users/user_roles.entity";

// 'htttp =? /library/books/'

const router = Router();

const repository = PostgresStrategy.createRepository(
  AppDataSource,
  "UserEntity",
);
const repositoryRole = PostgresStrategy.createRepository(AppDataSource, "Role");
const context = new ContextStrategy(new PostgresStrategy(repository));
const authController = new AuthController(
  context,
  repositoryRole as Repository<UserRole>,
);

router.post("/register", authController.registerUser.bind(authController));
router.post("/login", authController.loginUser.bind(authController));

export default router;
