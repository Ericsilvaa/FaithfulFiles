import { IBaseStrategy } from "../../db/interfaces/IBaseSrategy";

export default class ContextStrategy implements IBaseStrategy {
  constructor(public database: any) {
    this.database = database;
  }

  async connect() {
    return this.database.connect();
  }

  create(item: any) {
    return this.database.create(item)
  }

  async save<T>(item: T): Promise<T> {
    return this.database.save(item)
  }

  async findOne(query: any): Promise<any> {
    return await this.database.findOne(query)
  }
  async findAll(query: { skip?: number, take?: number, relations?: string[] }): Promise<any> {
    return await this.database.findAll(query)
  }

  async findAndCount(query: { relations: string[] }): Promise<any> {
    return await this.database.findAndCount(query)
  }

  async update(id: any, item: any): Promise<any> {
    return this.database.update(id, item)
  }

  async delete(id: number) {
    return this.database.delete(id)
  }

}
