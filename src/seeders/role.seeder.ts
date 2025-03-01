// import { AppDataSource } from "../database/dataSource";
// import { Book } from "../entities/books/books.entity";
// import { RoleEntity } from "../entities/permissions/roles.entity";

// AppDataSource.initialize().then(() => {
//   const repositoryRole = AppDataSource.getRepository(RoleEntity);
//   const repositoryBook = AppDataSource.getRepository(Book);

//   const roles = ["admin", "default", "owner"].forEach(async (role) => {
//     const roleEntity = repositoryRole.create({ name: role });
//     await repositoryRole.save(roleEntity);
//   });
// });
// //
