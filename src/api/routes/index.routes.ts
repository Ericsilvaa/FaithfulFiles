import express from "express";
import AuthRoute from "./auth.routes";
import UserRoute from "./user.routes";
import BookRoute from "./book.routes";
import AuthorRoute from "./author.routes";
import PublisherRoute from "./publisher.routes";
import RoleRoute from "./role.routes";
import AdminRoute from "./admin.routes";

const router = (app: express.Router) => {
  app.use("/library/profile", UserRoute);
  app.use("/library/auth/role", RoleRoute);
  app.use("/library/admin", AdminRoute);
  app.use("/library/auth", AuthRoute);
  app.use("/library/book", BookRoute);
  app.use("/library/author", AuthorRoute);
  app.use("/library/publisher", PublisherRoute);
};

export default router;
