import { DataSource } from "typeorm";
import { join } from "path";

const entitiesPathPostgres = join(__dirname, "../../entities/postgres/");
const entitiesPath = join(__dirname, "../../entities/postgres/");
const entitiesPathMongoDb = join(__dirname, "../../entities/mongodb/");

export const dbDataSourcePostgres = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "secret",
  database: "faithfulFiles_db_postgres",
  entities: [`${entitiesPathPostgres}/*`],
  synchronize: true,
});

export const dbDataSourceMongo = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "faithful_db_mongodb",
  entities: [`${entitiesPathMongoDb}/*`],
  synchronize: true,
});

// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "./src/config/db/database.sqlite",
//   entities: [`${entitiesPath}*`],
//   // entities: [UserEntity, AddressEntity],
//   synchronize: true,
// })

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "user",
//   password: "password",
//   database: "library_db",
//   entities: [
//     Author,
//     Book,
//     BookCopy,
//     BookDonation,
//     BookRequest,
//     Category,
//     LibraryFeedback,
//     Loan,
//     LoanHistory,
//     Member,
//     Reservation,
//     Review,
//     User,
//     UserRole,
//     Wishlist,
//   ],
//   synchronize: true,
//   logging: false,
// });
