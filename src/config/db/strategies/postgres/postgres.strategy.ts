import { IBaseStrategy } from "../../interfaces/IBaseSrategy";

export default class PostgresStrategy implements IBaseStrategy {
  private dbInstance: any
  constructor(private connectionString: string) {
    this.connectionString = connectionString;
  }


  async connect() {
    console.log('me connectei ao Postgres!!')
  }

  async create(item: any) {
    console.log("🚀 ~ PostgresStrategy ~ create ~ item:", item)
    // return this.dbInstance.save(item)
  }

  async find(item: any) {
    console.log(item)
  }


}