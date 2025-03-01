import { DataSource } from "typeorm";
import { loadEntities } from "../api/utils/loadEntities";

const databaseUrl = process.env.DATABASE_URL;
console.log("📌 DATABASE_URL:", databaseUrl);

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: true,
  logging: "all",
  ssl: {
    rejectUnauthorized: false,
  },
  entities: loadEntities({
    books: [
      "authors",
      "books",
      "categories",
      "publishers",
      "book_copies",
      "book_requests",
    ],
    users: ["members", "users", "user_roles"],
    // library: ["library"],
  }),
});
