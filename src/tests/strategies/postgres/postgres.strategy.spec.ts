import { dbDataSourcePostgres } from "../../../database/db/dataSource"
import { Book } from "../../../database/entities/postgres/book.entity"
import ContextStrategy from "../../../database/strategies/base/context.strategy"
import PostgresStrategy from "../../../database/strategies/postgres/postgres.strategy"



const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'UserEntity')
const contextdb = new ContextStrategy(new PostgresStrategy(repository))
const MOCK_BOOK = {
  title: 'Desiring God',
  page_count: 384,
  description: 'Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.',
  available: true,
  loan_count: 0
}

describe('Postgres Strategy', function () {

  it.only('PostgresSQL Connection', async () => {
    const result = await contextdb.connect()

    expect(result).toEqual(true)
  })

  it('Cadastrar Book', async () => {

    const { title, page_count, description, available, loan_count } = MOCK_BOOK
    const newBook = new Book(title, page_count, description, available, loan_count)

    const expected: Omit<Book, 'id'> = {
      title: 'Desiring God',
      author: undefined,
      page_count: 384,
      publisher: undefined,
      deleted_at: undefined,
      description: 'Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.',
      available: true,
      loan_count: 0
    }

    const result = await contextdb.create(newBook)
    Reflect.deleteProperty(result, 'id')


    expect(result).toEqual(expected)

  })

  it('#findAll and Read all books', async () => {


    const books = await contextdb.findAll({ skip: 0, take: 2 })
    const result = books.length

    const expected = 2

    expect(result).toEqual(expected)

  })

  it('#findOne and Read by id of the book', async () => {
    const result = await contextdb.findOne({ id: 1 })

    const expected: Book = {
      id: 1,
      title: 'Desiring God',
      page_count: 384,
      author: undefined,
      description: 'Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.',
      publisher: undefined,
      available: true,
      deleted_at: undefined,
      loan_count: 0
    }

    expect(result).toEqual(expected)

  })

  it('#Updated book by book id and findOne by title', async () => {
    const updatedBook = new Book('updated book', 10, 'updated book description', true, 0)

    await contextdb.update(3, updatedBook)

    const result = await contextdb.findOne({ title: 'updated book' })

    const expected: Book = {
      id: 3,
      title: 'updated book',
      page_count: 10,
      author: undefined,
      description: 'updated book description',
      publisher: undefined,
      available: true,
      loan_count: 0,
      deleted_at: undefined
    }

    expect(result).toEqual(expected)
  })

  it('#Delete Book by ID', async () => {

    const result = await contextdb.delete(2)

    const expected = 1

    expect(result.affected).toEqual(expected)
  })

})