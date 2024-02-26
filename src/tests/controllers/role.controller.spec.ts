import { DataSource } from "typeorm"
import { dbDataSourcePostgres } from "../../config/db/dataSource"
import ContextStrategy from "../../config/strategies/base/context.strategy"
import PostgresStrategy from "../../config/strategies/postgres/postgres.strategy"
import { Role } from "../../entities/postgres/roles.entity"

const MOCK_ROLE = {
  role_id: 2,
  name: 'default'
}

describe('Role Controller', () => {
  let connection: DataSource
  let context: ContextStrategy
  beforeAll(async () => {
    connection = await PostgresStrategy.connect() as DataSource
    const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
    context = new ContextStrategy(new PostgresStrategy(repository))
  })

  afterAll(async () => {
    await connection.destroy()
  })
  // test('#Create Role, you should create a new role', async () => {
  //   const role = 'owner'

  //   const expected: Role = {
  //     id: 3,
  //     name: 'owner',
  //     permissions: undefined,
  //     users: undefined,
  //   }

  //   const newRole = new Role(role)
  //   const result = await context.create(newRole)


  //   expect(result).toEqual(expected)

  // })

  test('#Read Role, you should read all list of role', async () => {
    const expected: Role[] = [
      {
        id: 1,
        name: 'admin',
        permissions: undefined,
        users: undefined
      },
      {
        id: 3,
        name: 'owner',
        permissions: undefined,
        users: undefined
      },
      {
        id: 2,
        name: 'default',
        permissions: undefined,
        users: undefined
      }
    ]

    const result = await context.findAll(({}))

    expect(result).toEqual(expected)

  })

  test('#Read Role by id, you should read a role when user pass a id', async () => {
    const { role_id } = MOCK_ROLE

    const expected: Role = {
      id: 2,
      name: 'default',
      permissions: undefined,
      users: undefined,
    }

    const result = await context.findOne({ id: role_id })

    expect(result).toEqual(expected)
  })

  test('#Update Role, you should update the role that passed in variable', async () => {
    const { role_id, name } = MOCK_ROLE

    const updateRole = new Role(name)
    await context.update(role_id, updateRole)

    const result = await context.findOne({ id: role_id })

    const expected: Role = {
      id: 2,
      name: 'default',
      permissions: undefined,
      users: undefined,
    }

    expect(result).toEqual(expected)
  })
})


