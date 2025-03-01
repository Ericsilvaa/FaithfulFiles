import { Router } from "express";
import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";

import { Repository } from "typeorm";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import AdminController from "../controllers/admin.controller";
import { dbDataSourcePostgres } from "../../database/dataSource";
import { UserRole } from "../../entities/users/user_roles.entity";

const router = Router();

const repository = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "UserEntity",
);
const repositoryRole = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "Role",
);
const context = new ContextStrategy(new PostgresStrategy(repository));
const adminController = new AdminController(
  context,
  repositoryRole as Repository<UserRole>,
);

router.use(Auth.isMember, roles(["admin"]));

router.get("/", (req, res) => res.send("Welcome to the Page Admin"));
router.get("/accounts", adminController.getAllUsers.bind(adminController));
router.post(
  "/update/user/",
  adminController.updateUserRole.bind(adminController),
);

export default router;
