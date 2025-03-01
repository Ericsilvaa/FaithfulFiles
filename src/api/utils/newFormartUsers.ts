import { User } from "../../entities/users/users.entity";

function newFormatUsers(users: User[]) {
  const newFormat = users.map((user) => ({
    id: user.id,
    username: user.name,
    email: user.email,
    role: user.role,
  }));

  const users_admin = newFormat.filter((user) => user.role === "admin");
  const users_default = newFormat.filter((user) => user.role === "user");
  const users_moderator = newFormat.filter((user) => user.role === "moderator");

  return { users_admin, users_default, users_moderator };
}

export { newFormatUsers };
