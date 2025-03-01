import { DataSource } from "typeorm";
import { join } from "path";

const entitiesPathPostgres = join(__dirname, "../../entities/postgres/");

export const dbDataSourcePostgres = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  name: "admin",
  password: "secret",
  database: "faithfulFiles_db_postgres",
  entities: [`${entitiesPathPostgres}/*`],
  synchronize: true,
});

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   name: "admin",
//   password: "secret",
//   database: "library_db",
//  entities: [`${entitiesPathPostgres}/*`],
//   synchronize: true,
//   logging: false,
// });
