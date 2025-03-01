import { Router } from "express";
import { UserRoleType } from "../../entities/users/user_roles.entity";
import { AppDataSource } from "../../database/dataSource";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";

import { PublisherController } from "../controllers/books/publisher.controller";
import Auth from "../middleware/Auth";

const router = Router();

const repository = PostgresStrategy.createRepository(
  AppDataSource,
  "Publisher",
);
const context = new ContextStrategy(new PostgresStrategy(repository));
const publisherController = new PublisherController();

router.use(Auth.isAuthenticated, Auth.authorizeRoles([UserRoleType.ADMIN]));

router.get("/", (req, res) => publisherController.getPublishers(req, res));
router.get("/:publisher_id", (req, res) =>
  publisherController.getPublisherById(req, res),
);

router.post("/", (req, res) => publisherController.createPublisher(req, res));
router.put("/:publisher_id", (req, res) =>
  publisherController.updatePublisher(req, res),
);

export default router;
