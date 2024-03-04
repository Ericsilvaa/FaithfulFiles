import { Router } from "express"
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy"
import { dbDataSourcePostgres } from "../config/db/dataSource"
import ContextStrategy from "../config/strategies/base/context.strategy"
import AuthController from "../controllers/auth.controller"
import { Repository } from "typeorm"
import { Role } from "../entities/postgres/roles.entity"



// 'htttp =? /library/books/'

const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'UserEntity')
const repositoryRole = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
const context = new ContextStrategy(new PostgresStrategy(repository))
const authController = new AuthController(context, (repositoryRole as Repository<Role>));


router.post('/register', authController.registerUser.bind(authController));
router.post('/login', authController.loginUser.bind(authController))

export default router