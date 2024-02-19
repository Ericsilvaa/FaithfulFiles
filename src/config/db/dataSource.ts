import { DataSource } from "typeorm"
import { join } from 'path'

// const entitiesPathPostgres = join(__dirname, "../../entities/postgres/")
const entitiesPath = join(__dirname, "../../entities/postgres/")
// const entitiesPathMongoDb = join(__dirname, "../../entities/mongodb/")

// export const dbDataSourcePostgres = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "admin",
//   database: "library_db",
//   entities: [`${entitiesPathPostgres}/*`],
//   synchronize: true,
// })

// export const dbDataSourceMongo = new DataSource({
//   type: "mongodb",
//   host: "localhost",
//   port: 27017,
//   database: "library_db",
// })

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/db/database.sqlite",
  entities: [`${entitiesPath}*`],
  // entities: [UserEntity, AddressEntity],
  synchronize: true,
})