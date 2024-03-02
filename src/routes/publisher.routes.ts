import { Router } from "express";
import PostgresStrategy from "../config/strategies/postgres/postgres.strategy";
import { dbDataSourcePostgres } from "../config/db/dataSource";
import ContextStrategy from "../config/strategies/base/context.strategy";
import PublisherController from "../controllers/publisher.controller";
import { Repository } from "typeorm";
import { Book } from "../entities/postgres/book.entity";



const router = Router()

const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Publisher')
const context = new ContextStrategy(new PostgresStrategy(repository))
const publisherController = new PublisherController(context);

router.get('/', publisherController.getAllPublishers.bind(publisherController))
router.get('/:publisher_id', publisherController.getPublisherById.bind(publisherController))
// router.get('/filter', PublisherController.getPublisherByFilters.bind(PublisherController))

router.post('/add', publisherController.createOrUpdatePublisher.bind(publisherController))
router.put('/updated/:publisher_id', publisherController.createOrUpdatePublisher.bind(publisherController))


export default router