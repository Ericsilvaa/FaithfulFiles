import { DataSource } from "typeorm";
import loadEntities from "../api/utils/loadEntities";

const databaseUrl = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: true,
  logging: "all",
  ssl: {
    rejectUnauthorized: false,
  },
  entities: loadEntities(["books", "library", "users"]),
});
