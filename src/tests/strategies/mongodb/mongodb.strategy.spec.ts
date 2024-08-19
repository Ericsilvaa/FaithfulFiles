import { dbDataSourceMongo } from "../../../database/db/dataSource"
import ContextStrategy from "../../../database/strategies/base/context.strategy"
import MongoDBStrategy from "../../../database/strategies/mongodb/mongodb.strategy"



const contextdb = new ContextStrategy(new MongoDBStrategy(dbDataSourceMongo))

describe('MongoDB Strategy', function () {
  it.only('MongoDB Connection', async () => {

    const result = await contextdb.connect()

    expect(result).toBe(true)
  })

})
