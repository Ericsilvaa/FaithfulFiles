import { Router } from "express";
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy";
import { dbDataSourcePostgres } from "../config/db/dataSource";
import ContextStrategy from "../config/strategies/base/context.strategy";
import UserController from "../controllers/user.controller";
import Auth from "../middleware/isAuth";



const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'UserEntity')
const context = new ContextStrategy(new PostgresStrategy(repository))
const userController = new UserController(context);

router.use(Auth.isMember)
router.get('/', userController.getCurrentUser.bind(userController))

router.put('/', userController.updateUser.bind(userController))


export default router