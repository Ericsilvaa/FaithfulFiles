import app from "./src/app";
import { dbDataSourceMongo, dbDataSourcePostgres } from "./src/config/db/dataSource";
import ContextStrategy from "./src/config/strategies/base/context.strategy";
import MongoDBStrategy from "./src/config/strategies/mongodb/mongodb.strategy";
import PostgresStrategy from "./src/config/strategies/postgres/postgres.strategy";





const PORT = process.env.PORT || "5001";

app.listen(PORT, () => {


  console.log("🚀 [server]: listening on port " + PORT);
});




// enum EnumContextTypes {
//   activityLog = "activityLog",
//   transaction = "transaction",
// }

// type ContextDb = typeof mongoDBContext | typeof postgresContext




// const ContextStrategyTypes: Record<EnumContextTypes, ContextDb> = {
//   [EnumContextTypes.activityLog]: postgresContext,
//   [EnumContextTypes.transaction]: mongoDBContext
// };




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


// for (const { user: { username, password_hash, email }, type } of data) {
//   console.log("🚀 ~ result:", result)
// }







