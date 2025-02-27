import { Request, Response } from "express";
import { dbDataSourceMongo } from "../config/db/dataSource";
import ContextStrategy from "../config/strategies/base/context.strategy";
import MongoDBStrategy from "../config/strategies/mongodb/mongodb.strategy";
// const contextMongoDb = new ContextStrategy(
//   new MongoDBStrategy(dbDataSourceMongo)
// );

export function TransactionDb(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      // await contextMongoDb.connect();
      const connected = await dbConnect();
      console.log("🚀 ~ connected:", connected);

      const result = await originalMethod.apply(this, args);
      console.log("🚀 ~ result:", result);

      // await contextMongoDb.disconnect();
      const disconnected = await dbDisconnect();
      console.log("🚀 ~ disconnected:", disconnected);
      return result;
    } catch (error) {
      throw error;
    }
  };
  return descriptor;
}

function dbConnect() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Database connected");
    }, 500);
  });
}
function dbDisconnect() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Database disconnected");
    }, 500);
  });
}
