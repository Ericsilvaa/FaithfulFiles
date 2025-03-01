import { dbDataSourcePostgres } from "../database/dataSource";
import { Book } from "../entities/books/books.entity";
import { RoleEntity } from "../entities/permissions/roles.entity";

dbDataSourcePostgres.initialize().then(() => {
  const repositoryRole = dbDataSourcePostgres.getRepository(RoleEntity);
  const repositoryBook = dbDataSourcePostgres.getRepository(Book);

  const roles = ["admin", "default", "owner"].forEach(async (role) => {
    const roleEntity = repositoryRole.create({ name: role });
    await repositoryRole.save(roleEntity);
  });
});
