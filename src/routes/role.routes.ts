import { Router } from "express"

import Auth from "../middleware/isAuth"
import { roles } from "../middleware/roles"

import { dbDataSourcePostgres } from "../config/db/dataSource"
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy"
import ContextStrategy from "../config/strategies/base/context.strategy"

import RoleController from "../controllers/role.controller"




const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
const context = new ContextStrategy(new PostgresStrategy(repository))
const roleController = new RoleController(context);

router.use(Auth.isMember, roles(["admin"]))

router.post('/newRole', roleController.createRole.bind(roleController));
router.post('/update/:id', roleController.updateRole.bind(roleController))

export default router