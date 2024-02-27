import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Book } from "../../../entities/postgres/book.entity";
import { dbDataSourcePostgres } from "../../db/dataSource";
import { RepositoryString, RepositoryStringT, RepositoryStringType } from "../../db/interfaces/IRepositoryString";



export default class PostgresStrategy {
  private repository: Repository<ObjectLiteral>;

  constructor(
    repository: Repository<ObjectLiteral>,
  ) {
    this.repository = repository
  }

  static async connect() {
    try {
      const connection = await dbDataSourcePostgres.initialize()

      if (!connection.isInitialized) throw new Error('Error initial database. connection')

      return connection

    } catch (error) {
      console.log(error)
    }
  }

  static createRepository<T extends ObjectLiteral>(connection: DataSource, entity: RepositoryString): Repository<T> {
    const repository = connection.getRepository<T>(entity as EntityTarget<T>);
    return repository;
  }


  async create(item: any) {
    this.repository.create(item);
  }

  async save<T>(item: T): Promise<T>;
  async save(item: Book): Promise<Book> {
    return this.repository.save(item);
  }

  async findAll(query: any) {
    return await this.repository.find(query)
  }

  async findAndCount(query: any) {
    console.log("🚀 ~ PostgresStrategy ~ findAndCount ~ query:", query)
    return await this.repository.findAndCount(query)
  }

  async findOne(query: any) {
    return await this.repository.findOne({ where: query })
  }

  async update(id: number, item: any) {
    return await this.repository.update(id, item)
  }

  async delete(id: number) {
    return await this.repository.softDelete(id)
  }


  // async checktUserAndBookExist(userId: any, bookId: any) {
  //   const [user, book] = await Promise.all([
  //     await this.repositoryUser.findOne({ where: { id: userId } }),
  //     await this.repository.findOne({ where: { id: bookId } })
  //   ])

  //   return { user, book }
  // }

  // this.repositoryBook = dbInitialized.getRepository('Book')
  // this.UserEntity = dbInitialized.getRepository('UserEntity')

  // this.entityRepository.forEach((entity) => {
  //   (PostgresStrategy.prototype as any)[entity] = dbInitialized.getRepository(entity)
  // })

}