import { dbDataSourcePostgres } from '../database/db/dataSource';
import { Book } from '../database/entities/postgres/book.entity';
import { Role } from '../database/entities/postgres/roles.entity';



dbDataSourcePostgres.initialize().then(() => {
  const repositoryRole = dbDataSourcePostgres.getRepository(Role)
  const repositoryBook = dbDataSourcePostgres.getRepository(Book)

  const roles = ['admin', 'default', 'owner'].forEach(async (role) => {
    const roleEntity = repositoryRole.create({ name: role })
    await repositoryRole.save(roleEntity)
  })

})