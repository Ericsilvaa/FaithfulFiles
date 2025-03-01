import { Router } from "express";
import { UserRoleType } from "../../../entities/users/user_roles.entity";
import Auth from "../../middleware/Auth";
import { AuthorController } from "../../controllers/books/author.controller";

const router = Router();

const authorController = new AuthorController();

// ✅ Middleware for Authentication & Role-Based Access Control
router.use(Auth.isAuthenticated, Auth.authorizeRoles([UserRoleType.ADMIN]));

// ✅ Routes
router.get("/", (req, res) => authorController.getAuthors(req, res));
router.get("/:author_id", (req, res) =>
  authorController.getAuthorById(req, res),
);

router.post("/", (req, res) => authorController.createAuthor(req, res));
router.put("/:author_id", (req, res) =>
  authorController.updateAuthor(req, res),
);

export default router;
