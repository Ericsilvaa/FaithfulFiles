import { IBaseStrategy } from "../../interfaces/IBaseSrategy";

export default class ContextStrategy implements IBaseStrategy {
  constructor(public database: any) {
    this.database = database;
  }

  async connect() {
    console.log('EXECUTANDO CONTEXT!!')
  }

  async create(item: any): Promise<void> {
    return item
  }

  async find(item: any): Promise<any> {
    console.log(item)
  }


}