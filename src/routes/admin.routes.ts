import { Router } from "express";
import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";
import AdminController from "../controllers/admin.controller";
import ContextStrategy from "../config/strategies/base/context.strategy";
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy";
import { dbDataSourcePostgres } from "../config/db/dataSource";
import { Repository } from "typeorm";
import { Role } from "../entities/postgres/roles.entity";


const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'UserEntity')
const repositoryRole = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
const context = new ContextStrategy(new PostgresStrategy(repository))
const adminController = new AdminController(context, (repositoryRole as Repository<Role>))

router.use(Auth.isMember, roles(['admin']))

router.get('/', (req, res) => res.send('Welcome to the Page Admin'))
router.get('/accounts', adminController.getAllUsers.bind(adminController))
router.post('/update/user/', adminController.updateUserRole.bind(adminController))

export default router