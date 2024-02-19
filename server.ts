import app from "./src/app";
import { AppDataSource } from "./src/config/db/dataSource";

import ContextStrategy from "./src/config/db/strategies/base/context.strategy";
import MongoDBStrategy from "./src/config/db/strategies/mongodb/mongodb.strategy";
import PostgresStrategy from "./src/config/db/strategies/postgres/postgres.strategy";
import { UserEntity } from "./src/entities/postgres/user.entity";

enum EnumContextTypes {
  activityLog = "activityLog",
  transaction = "transaction",
}

type ContextDb = typeof mongoDBContext | typeof postgresContext

const postgresContext = new ContextStrategy(new PostgresStrategy(AppDataSource))


const connectionMongoose = 'connectionMongoose'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(connectionMongoose))

const ContextStrategyTypes: Record<EnumContextTypes, ContextDb> = {
  [EnumContextTypes.activityLog]: postgresContext,
  [EnumContextTypes.transaction]: mongoDBContext
};


(async () => {
  // conexão com db

  const PORT = process.env.PORT || "5001";
  app.listen(PORT, () => {
    console.log("🚀 [server]: listening on port " + PORT);
  });


  // const data = [
  //   {
  //     user: {
  //       username: `erick +  ${Date.now()}`,
  //       phone: '85599878',
  //       email: `eric${Date.now()}@dev.com`,
  //       password_hash: '123456'
  //     }, type: EnumContextTypes.activityLog
  //   },
  // ]

  const context = ContextStrategyTypes['activityLog']
  await context.connect()
  // for (const { user: { username, password_hash, email }, type } of data) {
  //   console.log("🚀 ~ result:", result)
  // }


})()





