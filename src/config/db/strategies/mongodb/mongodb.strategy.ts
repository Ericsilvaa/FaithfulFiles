import { IBaseStrategy } from "../../interfaces/IBaseSrategy";

export default class MongoDBStrategy implements IBaseStrategy {
  constructor(private connectionString: string) {
    this.connectionString = connectionString;
  }

  async create(item: any) {
    console.log("🚀 ~ MongoDBStrategy ~ create ~ item:", item)
    // return this.dbInstance.save(item)
  }


  async connect() {
    console.log('me connectei ao Mongo!!')
  }

  async find(item: any) {
    console.log(item)
  }

}