import { dbDataSourceMongo } from "../../../../../config/db/dataSource";
import ContextStrategy from "../../../../../config/db/strategies/base/context.strategy";
import MongoDBStrategy from "../../../../../config/db/strategies/mongodb/mongodb.strategy";

const contextdb = new ContextStrategy(new MongoDBStrategy(dbDataSourceMongo))

describe('MongoDB Strategy', function () {
  it.only('MongoDB Connection', async () => {

    const result = await contextdb.connect()

    expect(result).toBe(true)
  })

})
