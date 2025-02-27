import { DataSource, MongoRepository } from "typeorm";
import { IBaseStrategy } from "../../db/interfaces/IBaseSrategy";
<<<<<<< HEAD:src/config/strategies/mongodb/mongodb.strategy.ts
import { BookTransaction } from "../../db/mongodb/bookTransaction.entity";
import { Book } from "../../../entities/postgres/book.entity";
=======
import { BookTransaction } from "../../entities/mongodb/bookTransaction.entity";
import { Book } from "../../entities/postgres/book.entity";

>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/database/strategies/mongodb/mongodb.strategy.ts

export default class MongoDBStrategy implements IBaseStrategy {
  private db!: MongoRepository<BookTransaction>;
  constructor(private connectionDb: DataSource) {
    this.connectionDb = connectionDb;
  }
<<<<<<< HEAD:src/config/strategies/mongodb/mongodb.strategy.ts
  findAllByGenerics<T extends keyof Book>(
    field: T,
    value: Book[T],
  ): Promise<T> {
=======
  findAllByGenerics<T extends keyof any>(field: T, value: any[T]): Promise<T> {
>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/database/strategies/mongodb/mongodb.strategy.ts
    throw new Error("Method not implemented.");
  }

  async connect() {
    try {
      const dbInitialized = await this.connectionDb.initialize();

      if (!dbInitialized.isInitialized)
        throw new Error("Error initial database connection");

      this.db = dbInitialized.getMongoRepository("BookTransaction");

      console.log("Connected to database");

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect() {
    const dbDisconnected = await this.connectionDb.destroy();

    console.log("Disconnect to database");
    return true;
  }

  async findAll(query?: any, skip: number = 0, take: number = 2) {
    return await this.db.find();
  }

  async findOne({ query }: { query: any }) {
    throw new Error("Method not implemented.");
  }

  create<T>(item: T): T {
    throw new Error("Method not implemented.");
  }

  findAndCount({ relations }: { relations: string[] }): void {
    throw new Error("Method not implemented.");
  }

  async save(user: any): Promise<any>;
  async save(item: any) {
    return this.db.save(item);
  }

  update(id: any, item: any): void {
    throw new Error("Method not implemented.");
  }

  delete(id: any): void {
    throw new Error("Method not implemented.");
  }
}
