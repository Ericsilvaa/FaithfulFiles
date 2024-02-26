import { dbDataSourcePostgres } from "./db/dataSource"
import ContextStrategy from "./strategies/base/context.strategy"
import PostgresStrategy from "./strategies/postgres/postgres.strategy"


function main() {
  const connection = PostgresStrategy.connect()
  console.log("🚀 ~ main ~ connection:", connection)


  return connection
}

export default main()