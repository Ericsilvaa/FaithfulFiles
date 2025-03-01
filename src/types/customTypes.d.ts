import { IAddress } from "../api/interfaces/IAddress";
import { User } from "../entities/users/users.entity";

type UserLogin = Pick<User, "email" | "name">;

type UserLogged = {
  id: string | number;
  email: string;
  address: IAddress | undefined;
};

interface UserRequest {
  user: UserLogin;
  userLogged: UserLogged;
}

declare module "express-serve-static-core" {
  interface Request extends UserRequest {}
}
