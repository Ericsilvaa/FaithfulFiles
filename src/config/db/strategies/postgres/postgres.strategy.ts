import { DataSource, Repository } from "typeorm";
import { IBaseStrategy } from "../../interfaces/IBaseSrategy";
import { Book } from "../../../../entities/postgres/book.entity";


export default class PostgresStrategy implements IBaseStrategy {
  private db!: Repository<Book>
  constructor(private connection: DataSource) {
    this.connection = connection;
  }

  async connect() {
    try {
      const dbInitialized = await this.connection.initialize()

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

  async find(query: any) {
    return await this.db.find(query)
  }

  async update(id: any, item: any) {
    throw new Error("Method not implemented.");
  }

  async delete(id: any) {
    return await this.db.delete(id)
  }

}