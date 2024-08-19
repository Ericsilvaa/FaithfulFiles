import { Router } from "express"

import Auth from "../middleware/isAuth"
import { roles } from "../middleware/roles"
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy"
import ContextStrategy from "../../database/strategies/base/context.strategy"
import RoleController from "../controllers/role.controller"
import { dbDataSourcePostgres } from "../../database/db/dataSource"





const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
const context = new ContextStrategy(new PostgresStrategy(repository))
const roleController = new RoleController(context);

router.use(Auth.isMember, roles(["admin"]))

router.post('/newRole', roleController.createRole.bind(roleController));
router.post('/update/:id', roleController.updateRole.bind(roleController))

export default router