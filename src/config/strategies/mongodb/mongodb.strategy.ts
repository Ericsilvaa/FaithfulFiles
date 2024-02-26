import { DataSource, MongoRepository } from "typeorm";
import { IBaseStrategy } from "../../db/interfaces/IBaseSrategy";
import { BookTransaction } from "../../../entities/mongodb/bookTransaction.entity";


export default class MongoDBStrategy implements IBaseStrategy {
  private db!: MongoRepository<BookTransaction>
  constructor(private connectionDb: DataSource) {
    this.connectionDb = connectionDb;
  }

  async connect() {
    try {
      // const dbInitialized = await this.connectionDb.initialize()

      // if (!dbInitialized.isInitialized) throw new Error('Error initial database connection')

      // this.db = dbInitialized.getMongoRepository('BookTransaction')
      console.log('true')
      return true

    } catch (error) {
      console.log(error)
    }
  }

  async findAll(query?: any, skip: number = 0, take: number = 2) {
    throw new Error("Method not implemented.");
  }

  async findOne({ query }: { query: any }) {
    throw new Error("Method not implemented.");
  }

  async create(user: any): Promise<any>;
  async create(item: any) {
    console.log("🚀 ~ MongoDBStrategy ~ create ~ item:", item)
    // return this.dbInstance.save(item)
  }

  update(id: any, item: any): void {
    throw new Error("Method not implemented.");
  }

  delete(id: any): void {
    throw new Error("Method not implemented.");
  }


}