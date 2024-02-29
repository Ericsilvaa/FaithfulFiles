import { Request, Response } from "express"
import { dbDataSourceMongo } from "../config/db/dataSource"
import ContextStrategy from "../config/strategies/base/context.strategy"
import MongoDBStrategy from "../config/strategies/mongodb/mongodb.strategy"

export default function TransactionDb(target: any, propetyName: any, descriptor: any) {

  const contextMongoDb = new ContextStrategy(new MongoDBStrategy(dbDataSourceMongo))

  const method = descriptor.value

  descriptor.value = async function (req: Request, res: Response) {
    try {
      const connect = await contextMongoDb.connect()
      const returnMethod = await method.apply(this, [req, res])
      console.log("🚀 ~ returnMethod:", returnMethod)
      const disconnect = await contextMongoDb.disconnect()
      returnMethod

    } catch (error) {
      throw error
    }
  }
  return descriptor
}