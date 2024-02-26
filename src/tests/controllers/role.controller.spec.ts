import { DataSource, ObjectLiteral, Repository } from "typeorm"
import { dbDataSourcePostgres } from "../../config/db/dataSource"
import ContextStrategy from "../../config/strategies/base/context.strategy"
import PostgresStrategy from "../../config/strategies/postgres/postgres.strategy"
import { Role } from "../../entities/postgres/roles.entity"
import { Permissions } from "../../entities/postgres/permissions.entity"

const MOCK_ROLE = {
  role_id: 2,
  name: 'default'
}

describe('Role Controller', () => {
  let connection: DataSource
  let context: ContextStrategy
  let repositoryPermissions: Repository<Permissions>

  beforeAll(async () => {
    connection = await PostgresStrategy.connect() as DataSource
    const repository = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Role')
    context = new ContextStrategy(new PostgresStrategy(repository))

    repositoryPermissions = PostgresStrategy.createRepository(dbDataSourcePostgres, 'Permissions')
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

  // test('#Read Role, you should read all list of role', async () => {
  //   const expected: Role[] = [

  //   ]

  //   const result = await context.findAll(({}))

  //   expect(result).toEqual(expected)

  // })

  // test('#Read Role by id, you should read a role when user pass a id', async () => {
  //   const { role_id } = MOCK_ROLE

  //   const expected: Role = {
  //     id: 2,
  //     name: 'default',
  //     permissions: undefined,
  //     users: undefined,
  //   }

  //   const result = await context.findOne({ id: role_id })

  //   expect(result).toEqual(expected)
  // })

  // test('#Update Role, you should update the role that passed in variable', async () => {
  //   const { role_id, name } = MOCK_ROLE

  //   const permissions = await repositoryPermissions.findOne({ where: { name: 'READ' } })


  //   const updateRole = new Role(name)
  //   await context.update(role_id, updateRole)

  //   const result = await context.findOne({ id: role_id })

  //   const expected: Role = {
  //     id: 2,
  //     name: 'default',
  //     permissions: undefined,
  //     users: undefined,
  //   }

  //   expect(result).toEqual(expected)
  // })


  // test('#Create Role with Permission Default', async () => {
  //   const role = 'default'
  //   const permissions_id = 1

  //   const expected: Role = {
  //     id: 2,
  //     name: role,
  //     permissions: [{ id: 1, name: 'READ', role: undefined }],
  //     users: undefined
  //   }

  //   const permission = await repositoryPermissions.findOne({ where: { id: permissions_id } })

  //   const newRole = new Role(role)
  //   if (permission) {
  //     newRole.permissions = [permission]
  //   }

  //   const result = await context.create(newRole)

  //   expect(result).toEqual(expected)

  // })

  // test('#Create Role with Permission Admin', async () => {
  //   const role = 'admin'

  //   const expected: Role = {
  //     id: 1,
  //     name: role,
  //     permissions: [
  //       { id: 1, name: 'READ', role: undefined },
  //       { id: 2, name: 'DELETE', role: undefined },
  //       { id: 3, name: 'CREATE', role: undefined },
  //       { id: 4, name: 'UPDATE', role: undefined }
  //     ],
  //     users: undefined
  //   }

  //   const newRole = new Role(role)
  //   const AllItemPermission = await repositoryPermissions.find()

  //   newRole.permissions = [...AllItemPermission]

  //   const result = await context.create(newRole)

  //   expect(result).toEqual(expected)

  // })

  //   test('#Create Role with Permission Owner', async () => {
  //     const role = 'owner'
  //     const permissions_name = [1,2]

  //     interface permission {
  //       id: any
  //       name: string
  //     }

  //     const newRole = new Role(role)

  //     let permissions: permission[] = []
  //     permissions_name.forEach((item) => {
  //       const { id, name } = new Permissions(item)
  //       permissions.push({ id, name })
  //     })

  //     newRole.permissions = [...permissions]

  //     const result = await context.create(newRole)

  //     // expect(result).toEqual(expected)

  //   })
})


