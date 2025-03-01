import { DataSource } from "typeorm";
import ContextStrategy from "../../../database/strategies/base/context.strategy";
import PostgresStrategy from "../../../database/strategies/postgres/postgres.strategy";
import { dbDataSourcePostgres } from "../../../database/dataSource";

const MOCK_PERMISSIONS = {
  permission_id: 2,
  name: "UPDATE",
};

describe("Permissions Controller", () => {
  let connection: DataSource;
  let context: ContextStrategy;
  beforeAll(async () => {
    connection = (await PostgresStrategy.connect()) as DataSource;
    const repository = PostgresStrategy.createRepository(
      dbDataSourcePostgres,
      "Permissions",
    );
    context = new ContextStrategy(new PostgresStrategy(repository));
  });

  afterAll(async () => {
    await connection.destroy();
  });

  // test('#Create Permissions, you should create a new Permissions', async () => {
  //   const { name } = MOCK_PERMISSIONS

  //   const expected: Permissions = {
  //     id: 3,
  //     name: 'READ',
  //     role: undefined
  //   }

  //   const newRole = new Permissions(name)
  //   const result = await context.create(newRole)

  //   expect(result).toEqual(expected)

  // })

  // test('#Create All Permissions', async () => {
  //   const permissions_name = ['READ', 'UPDATE', 'CREATE', 'DELETE']

  //   const expected: Permissions[] = [
  //     { id: 1, name: 'READ', role: undefined },
  //     { id: 2, name: 'UPDATE', role: undefined },
  //     { id: 3, name: 'CREATE', role: undefined },
  //     { id: 4, name: 'DELETE', role: undefined }
  //   ]

  //   const allPermission = permissions_name.map(async (name: string) => {
  //     const newPermission = new Permissions(name)
  //     return await context.create(newPermission)
  //   })

  //   const result = await Promise.all(allPermission)

  //   expect(result).toEqual(expected)
  // })

  // test('#Read all Permissions, you should read all list of permissions', async () => {
  //   const expected: Permissions[] = [
  //     { id: 1, name: 'READ', role: undefined },
  //     { id: 2, name: 'DELETE', role: undefined },
  //     { id: 3, name: 'CREATE', role: undefined },
  //     { id: 4, name: 'UPDATE', role: undefined }
  //   ]

  //   const result = await context.findAll(({}))

  //   expect(result).toEqual(expected)

  // })

  // test('#Read Role by id, you should read a role when user pass a id', async () => {
  //   const { permission_id } = MOCK_PERMISSIONS

  //   const expected: Permissions = {
  //     id: 2,
  //     name: 'UPDATE',
  //     role: undefined
  //   }

  //   const result = await context.findOne({ id: permission_id })

  //   expect(result).toEqual(expected)
  // })

  // test('#Update Pèrmissions, you should update the Pèrmissions that passed in variable', async () => {
  //   const { permission_id, name } = MOCK_PERMISSIONS

  //   const updatePermission = new Permissions(name)
  //   await context.update(permission_id, updatePermission)

  //   const result = await context.findOne({ id: permission_id })

  //   const expected: Permissions = {
  //     id: 2,
  //     name: 'UPDATE',
  //     role: undefined
  //   }

  //   expect(result).toEqual(expected)
  // })
});
