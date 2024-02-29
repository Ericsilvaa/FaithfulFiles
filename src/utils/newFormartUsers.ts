import { UserEntity } from "../entities/postgres/user.entity";

function newFormatUsers(users: UserEntity[]) {

  const newFormat = users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role.name
  }))

  const users_admin = newFormat.filter(user => user.role === 'admin')
  const users_default = newFormat.filter(user => user.role === 'default')

  return { users_admin, users_default }

}

export {
  newFormatUsers
}