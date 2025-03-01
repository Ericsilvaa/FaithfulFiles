import { Router } from "express";

import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import RoleController from "../controllers/role.controller";
import { AppDataSource } from "../../database/dataSource";
import Auth from "../middleware/Auth";
import { UserRoleType } from "../../entities/users/user_roles.entity";

const router = Router();

const repository = PostgresStrategy.createRepository(AppDataSource, "Role");
const context = new ContextStrategy(new PostgresStrategy(repository));
const roleController = new RoleController(context);

router.use(
  Auth.isAuthenticated,
  Auth.authorizeRoles([UserRoleType.ADMIN, UserRoleType.SUPER_ADMIN]),
);

router.post("/newRole", roleController.createRole.bind(roleController));
router.post("/update/:id", roleController.updateRole.bind(roleController));

export default router;
