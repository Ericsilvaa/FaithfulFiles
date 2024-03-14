import { UserEntity } from "../../database/entities/postgres/user.entity"

function newFormatUsers(users: UserEntity[]) {

  const newFormat = users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role.name
  }))

  const users_admin = newFormat.filter(user => user.role === 'admin')
  const users_default = newFormat.filter(user => user.role === 'default')
  const users_owner = newFormat.filter(user => user.role === 'owner')

  return { users_admin, users_default, users_owner }

}

export {
  newFormatUsers
}