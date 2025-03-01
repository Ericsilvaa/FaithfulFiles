import { DataSource } from "typeorm";
import { loadEntities } from "../api/utils/loadEntities";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   name: "admin",
//   password: "secret",
//   database: "faithfulFiles_db_postgres",
//   entities: [`${entitiesPathPostgres}/*`],
//   synchronize: true,
// });

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER || "eric",
//   password: process.env.DB_PASSWORD || "password",
//   database: process.env.DB_NAME || process.env.DATABASE_URL,
//   entities: [entitiesPathPostgres_1],
//   synchronize: true,
//   logging: false,
// });

const databaseUrl = process.env.DATABASE_URL;
console.log("📌 DATABASE_URL:", databaseUrl);

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  synchronize: true,
  logging: "all",
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões externas ao Supabase
  },
  entities: loadEntities({
    books: [
      "authors",
      "books",
      "categories",
      "publishers",
      "book_copies",
      "book_requests",
    ], // 🔹 Escolha quais arquivos carregar na pasta `books`
    users: ["members", "users", "user_roles"], // 🔹 Escolha arquivos da pasta `users`
    // library: ["library"], // 🔹 Adicione entidades específicas da `library`
  }),
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
