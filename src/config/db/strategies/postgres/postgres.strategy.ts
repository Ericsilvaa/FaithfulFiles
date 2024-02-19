import { DataSource, Repository } from "typeorm";
import { IBaseStrategy } from "../../interfaces/IBaseSrategy";
import { UserEntity } from "../../../../entities/postgres/user.entity";

export default class PostgresStrategy implements IBaseStrategy {
  private db!: Repository<UserEntity>
  constructor(private connection: DataSource) {
    this.connection = connection;
  }

  async connect() {
    try {
      const dbInitialized = await this.connection.initialize()

      if (!dbInitialized.isInitialized) throw new Error('Error initial database connection')

      console.log(`💫 ~ [database]: initialized connection`)
      this.db = dbInitialized.getRepository('UserEntity')

    } catch (error) {
      console.log(error)
    }
  }

  async create(user: UserEntity) {
    return await this.db.save(user)
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