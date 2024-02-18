import app from "./src/app";

import ContextStrategy from "./src/config/db/strategies/base/context.strategy";
import MongoDBStrategy from "./src/config/db/strategies/mongodb/mongodb.strategy";
import PostgresStrategy from "./src/config/db/strategies/postgres/postgres.strategy";

enum EnumContextTypes {
  activityLog = "activityLog",
  transaction = "transaction",
}

type ContextDb = typeof mongoDBContext | typeof postgresContext

const connectionPostgres = 'connectionPostgres'
const postgresContext = new ContextStrategy(new PostgresStrategy(connectionPostgres))


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


  const data = [
    { name: 'postgres', type: EnumContextTypes.activityLog },
    { name: 'mongodb', type: EnumContextTypes.transaction }
  ]

  for (const { name, type } of data) {
    const context = ContextStrategyTypes[type]
    await context.connect()
    await context.create({ name: `erick +  ${Date.now()}` })

    console.log(type, context.database.constructor.name)
    console.log(await context.find(`erick +  ${Date.now()}`))

  }

})()





