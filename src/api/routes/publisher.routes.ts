import { Router } from "express";


import Auth from "../middleware/isAuth";
import { roles } from "../middleware/roles";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import PublisherController from "../controllers/publisher.controller";
import { dbDataSourcePostgres } from "../../database/db/dataSource";



const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Publisher')
const context = new ContextStrategy(new PostgresStrategy(repository))
const publisherController = new PublisherController(context);

router.use(Auth.isMember, roles(["admin"]))

router.get('/', publisherController.getAllPublishers.bind(publisherController))
router.get('/:publisher_id', publisherController.getPublisherById.bind(publisherController))
// router.get('/filter', PublisherController.getPublisherByFilters.bind(PublisherController))

router.post('/add', publisherController.createOrUpdatePublisher.bind(publisherController))
router.put('/updated/:publisher_id', publisherController.createOrUpdatePublisher.bind(publisherController))


export default router