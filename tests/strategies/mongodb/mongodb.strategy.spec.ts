
import { dbDataSourceMongo } from './../../../src/config/db/dataSource'
import ContextStrategy from './../../../src/config/strategies/base/context.strategy'
import MongoDBStrategy from './../../../src/config/strategies/mongodb/mongodb.strategy'


const contextdb = new ContextStrategy(new MongoDBStrategy(dbDataSourceMongo))

describe('MongoDB Strategy', function () {
  it.only('MongoDB Connection', async () => {

    const result = await contextdb.connect()

    expect(result).toBe(true)
  })

})
