import { IBaseStrategy } from "../../interfaces/IBaseSrategy";

export default class ContextStrategy implements IBaseStrategy {
  constructor(public database: any) {
    this.database = database;
  }

  async connect() {
    return this.database.connect();
  }

  async create<T>(item: T): Promise<T> {
    return await this.database.create(item)
  }

  async find(item: any): Promise<any> {
    return await this.database.find(item)
  }

  update(id: any, item: any): void {
    return this.database.update(id, item)
  }

  delete(id: any): void {
    return this.database.delete(id)
  }

}