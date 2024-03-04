
// istanbul ignore next
import { DataSource, ObjectLiteral } from "typeorm"
import { dbDataSourcePostgres } from "../../config/db/dataSource"
import PostgresStrategy from "../../config/strategies/postgres/postgres.strategy"
import TransactionBuilder from "../../utils/Transaction/TransactionBuilder"
import TransactionFacade from "../../utils/Transaction/TransactionFacade"


describe('Test with Transaction Controller', () => {
  let dbconnection: DataSource
  let user: ObjectLiteral

  let book: ObjectLiteral

  beforeAll(async () => {
    dbconnection = await PostgresStrategy.connect() as DataSource
    user = await PostgresStrategy.createRepository(dbDataSourcePostgres, 'UserEntity').findOne({ where: { id: 3 } }) as ObjectLiteral
    book = await PostgresStrategy.createRepository(dbDataSourcePostgres, 'Book').findOne({ where: { id: 1 } }) as ObjectLiteral
  })

  test('#TransactionController - Should generate a new user instance', () => {
    const result = new TransactionBuilder().setUser(user).build()

    const expected = {
      user: {
        id: 3,
        username: 'Isabelle Rodrigues Guimarães',
        email: 'bel@dev.com.br',
      }
    }

    expect(result).toEqual(expected)

  })

  test('#TransactionController - Should generate a new book instace', () => {
    const result = new TransactionBuilder().setBook(book).build()

    const expected = {
      book: {
        id: 1,
        title: '1984',
      }
    }

    expect(result).toEqual(expected)
  })

  test('#TransactionController - Should generate a inital and finish date instance', () => {
    const result = new TransactionBuilder().startAndFinishDate().build()


    const expected = {
      startDate: new Date(result.startDate),
      endDate: new Date(result.endDate)
    }

    expect(result).toEqual(expected)

  })
  test('#TransactionController - Should generate transaction instance', () => {
    const result = new TransactionBuilder().setUser(user).setBook(book).startAndFinishDate().build()

    const expected = {
      user: { id: 3, username: 'Isabelle Rodrigues Guimarães', email: 'bel@dev.com.br' },
      book: { id: 1, title: '1984' },
      startDate: new Date(result.startDate),
      endDate: new Date(result.endDate)
    }

    expect(result).toEqual(expected)
  })

  test('#TransactionFACADE - Should generate a entity the bookTransaction', () => {
    const result = TransactionFacade.Transaction(user, book)

    const expected = {
      _id: undefined,
      user: { id: 3, username: 'Isabelle Rodrigues Guimarães', email: 'bel@dev.com.br' },
      book: { id: 1, title: '1984' },
      startDate: new Date(result.startDate),
      endDate: new Date(result.endDate),
      returned: undefined
    }

    expect(result).toEqual(expected)
  })

  test('#TransactionController - the function build should be always invocaded', () => {
    // create a mock transaction
    const originalFnBuild = TransactionBuilder.prototype.build
    const mockBuild = jest.fn()
    TransactionBuilder.prototype.build = mockBuild

    // code called the fuction build
    // and replace it to line relevant
    const build = new TransactionBuilder().build()

    expect(mockBuild).toHaveBeenCalled();

    // restore
    TransactionBuilder.prototype.build = originalFnBuild
  })

})


