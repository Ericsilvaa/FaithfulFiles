import PostgresStrategy from '../../../../../config/db/strategies/postgres/postgres.strategy';
import ContextStrategy from "../../../../../config/db/strategies/base/context.strategy";
import { AppDataSource } from '../../../../../config/db/dataSource';
import { UserEntity } from '../../../../../entities/postgres/user.entity';

const context = new ContextStrategy(new PostgresStrategy(AppDataSource))

const USER_REGISTER = {
  username: `eric`,
  phone: '85599878',
  email: `eric@dev.com`,
  password_hash: '123456'
}

describe('Postgres Strategy', function () {

  it('PostgresSQL Connection', async () => {
    const result = await context.connect()
    expect(result).toEqual(true)
  })

  it('Cadastrar Usuario', async () => {
    const { username, email, password_hash } = USER_REGISTER
    const newUser = new UserEntity(username, password_hash, email)

    const expected = {
      username: 'eric',
      email: 'eric@dev.com',
      password_hash: '123456',
      token: null,
      phone: null,
      avatar_url: null,
      address: undefined
    }

    const result = await context.create(newUser)
    Reflect.deleteProperty(result, 'id')

    expect(result).toEqual(expected)

  })

  test.todo('#Encontrar Usuario')
  test.todo('#Atualizar Usuario')
  test.todo('#Deletar Usuario')

})