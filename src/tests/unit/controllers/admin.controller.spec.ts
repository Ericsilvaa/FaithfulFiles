import { ObjectLiteral, Repository } from "typeorm"
import { dbDataSourcePostgres } from "../../../config/db/dataSource"
import ContextStrategy from "../../../config/strategies/base/context.strategy"
import PostgresStrategy from "../../../config/strategies/postgres/postgres.strategy"
import AdminController from "../../../controllers/admin.controller"
import { Role } from "../../../entities/postgres/roles.entity"
import app from "../../../app"
import { response } from "express"

const URL = 'http://localhost:5000/library/admin/accounts'
describe('#AdminController Test', () => {
  test('#getAllUsers, sholud be return a list of users separated by roles', (done) => {
    const expected = [{
      users_admin: [
        {
          id: 4,
          username: "Igreja Batista do Henrique Jorge",
          email: "ibhj@dev.com.br",
          role: "admin"
        },
        {
          id: 1,
          username: "Isabelle",
          email: "bel@dev.com.br",
          role: "admin"
        }
      ],
      users_default: [
        {
          id: 3,
          username: "leo",
          email: "leo@dev.com.br",
          role: "default"
        }
      ],
      users_owner: [
        {
          id: 2,
          username: "Eric",
          email: "eric@dev.com.br",
          role: "owner"
        }
      ],
      total_users: 4
    }]


  })
  test.todo('#updateUserRole, sholud be update a user')

  class ResponseMock {
    private jsonMock: any

    json(value: any) {
      this.jsonMock = value
    }

    status(value: any) {
      return this
    }
  }


})