import { IBaseStrategy } from "../../interfaces/IBaseSrategy";

export default class MongoDBStrategy implements IBaseStrategy {
  constructor(private connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect() {
    console.log('me connectei ao Mongo!!')
  }

  async find(item: any) {
    console.log(item)
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