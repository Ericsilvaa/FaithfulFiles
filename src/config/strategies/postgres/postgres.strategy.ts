import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { Book } from "../../../entities/postgres/book.entity";
import { dbDataSourcePostgres } from "../../db/dataSource";
import { RepositoryString } from "../../db/interfaces/IRepositoryString";



export default class PostgresStrategy {
  private repository: Repository<ObjectLiteral>;

  constructor(repository: Repository<ObjectLiteral>) {
    this.repository = repository
  }

  static async connect() {
    try {
      const connection = await dbDataSourcePostgres.initialize()

      if (!connection.isInitialized) throw new Error('Error initial database. connection')

      console.log("🚀 ~ PostgresStrategy ~ connect ~ connection:", true)
      return connection

    } catch (error) {
      console.log(error)
    }
  }

  static createRepository(connection: DataSource, entity: RepositoryString) {
    const repository = connection.getRepository(entity)
    return repository
  }


  async create<T>(item: T): Promise<T>;
  async create(item: Book): Promise<Book> {
    return this.repository.save(item);
  }

  async findAll(query: any) {
    return await this.repository.find(query)
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