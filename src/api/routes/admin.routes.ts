import { Router } from "express";
import { Repository } from "typeorm";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import AdminController from "../controllers/admin.controller";
import { AppDataSource } from "../../database/dataSource";
import { UserRole, UserRoleType } from "../../entities/users/user_roles.entity";
import Auth from "../middleware/Auth";
const router = Router();

const repository = PostgresStrategy.createRepository(
  AppDataSource,
  "UserEntity",
);
const repositoryRole = PostgresStrategy.createRepository(AppDataSource, "Role");
const context = new ContextStrategy(new PostgresStrategy(repository));
const adminController = new AdminController(
  context,
  repositoryRole as Repository<UserRole>,
);

router.use(
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN]),
);

router.get("/", (req, res) => res.send("Welcome to the Page Admin"));
router.get("/accounts", adminController.getAllUsers.bind(adminController));
router.post(
  "/update/user/",
  adminController.updateUserRole.bind(adminController),
);

export default router;
