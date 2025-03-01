import { UserRoleType } from "../entities/users/user_roles.entity";

interface UserRequest {
  user?: {
    id: string;
    email: string;
    name: string;
    role: UserRoleType;
  };
}

declare module "express-serve-static-core" {
  interface Request extends UserRequest {}
}
