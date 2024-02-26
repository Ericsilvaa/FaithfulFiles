import { DataSource, ObjectId, Repository } from "typeorm";
import { IBaseStrategy } from "../../interfaces/IBaseSrategy";
import { Book } from "../../../../entities/postgres/book.entity";


export default class PostgresStrategy implements IBaseStrategy {
  private db!: Repository<Book>
  constructor(private connectionDb: DataSource) {
    this.connectionDb = connectionDb;
  }

  async connect() {
    try {
      const dbInitialized = await this.connectionDb.initialize()

      if (!dbInitialized.isInitialized) throw new Error('Error initial database connection')

      this.db = dbInitialized.getRepository('Book')

      return true

    } catch (error) {
      console.log(error)
    }
  }

  async create<T>(item: T): Promise<T>;
  async create(item: Book): Promise<Book> {
    return this.db.save(item);
  }

  async findAll(query: any) {
    return await this.db.find(query);
  }

  async findOne(query: any) {
    return await this.db.findOne({ where: query })
  }

  async update(id: number, item: any) {
    return await this.db.update(id, item)
  }

  async delete(id: number) {
    return await this.db.softDelete(id)
  }

}