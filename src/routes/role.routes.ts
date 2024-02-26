import { Router } from "express"
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy"
import { dbDataSourcePostgres } from "../config/db/dataSource"
import ContextStrategy from "../config/strategies/base/context.strategy"
import AuthController from "../controllers/auth.controller"



// 'htttp =? /library/books/'

const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
const context = new ContextStrategy(new PostgresStrategy(repository))
const userController = new AuthController(context);


router.post('/register', userController.registerUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController))

export default router