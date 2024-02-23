import { IBaseStrategy } from "../../db/interfaces/IBaseSrategy";

export default class ContextStrategy implements IBaseStrategy {
  constructor(public database: any) {
    this.database = database;
  }

  async connect() {
    return this.database.connect();
  }

  async create<T>(item: T): Promise<T> {
    return this.database.create(item)
  }

  async findAll(query: { skip?: number, take?: number }): Promise<any> {
    return await this.database.findAll(query)
  }

  async findOne(query: any): Promise<any> {
    return await this.database.findOne(query)
  }

  async update(id: any, item: any): Promise<any> {
    return this.database.update(id, item)
  }

  async delete(id: number) {
    return this.database.delete(id)
  }

}
