import PostgresStrategy from '../../../../../config/db/strategies/postgres/postgres.strategy';
import ContextStrategy from "../../../../../config/db/strategies/base/context.strategy";
import { AppDataSource } from '../../../../../config/db/dataSource';
import { Book } from '../../../../../entities/postgres/book.entity';
import { Author } from '../../../../../entities/postgres/author.entity';
import { Publisher } from '../../../../../entities/postgres/publisher.entity';

const contextdb = new ContextStrategy(new PostgresStrategy(AppDataSource))


const MOCK_BOOK = {
  title: 'Desiring God',
  page_count: 384,
  description: 'Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.',
  available: true,
  loan_count: 0
}

describe('Postgres Strategy', function () {
  it('PostgresSQL Connection', async () => {
    const result = await contextdb.connect()
    expect(result).toEqual(true)
  })

  it('Cadastrar Book', async () => {
    const { title, page_count, description, available, loan_count } = MOCK_BOOK

    const newBook = new Book(title, page_count, description, available, loan_count)

    const expected = {
      title: 'Desiring God',
      page_count: 384,
      description: 'Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.',
      available: true,
      loan_count: 0
    }

    const result = await contextdb.create(newBook)

    Reflect.deleteProperty(result, 'id')


    expect(result).toEqual(expected)

  })

  test.todo('#Encontrar Usuario')
  test.todo('#Atualizar Usuario')
  test.todo('#Deletar Usuario')

})