<<<<<<< HEAD:src/middleware/roles.ts
import { NextFunction, Request, Response } from "express";
import { dbDataSourcePostgres } from "../config/db/dataSource";
import { UserEntity } from "../entities/postgres/user.entity";
=======
import { NextFunction, Request, Response } from "express"
import { dbDataSourcePostgres } from "../../database/db/dataSource"
import { UserEntity } from "../../database/entities/postgres/user.entity"

>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/api/middleware/roles.ts

type RoleString = "default" | "admin" | "owner";

export const roles = (role: RoleString[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD:src/middleware/roles.ts
    const pathname = req.path;
    const { email } = req.user;

    const user = (await dbDataSourcePostgres
      .getRepository("UserEntity")
      .findOne({ where: { email }, relations: ["role"] })) as UserEntity;
=======
    const pathname = req.path
    const { email } = req.user

    const user = await dbDataSourcePostgres.getRepository('UserEntity')
      .findOne({ where: { email }, relations: ['role', 'owner_book'] }) as UserEntity
>>>>>>> 768ccf01d80e950ce2814a988b75c082878e5ad0:src/api/middleware/roles.ts

    if (!user) return res.status(401).send("User não cadastrado!");
    req.userLogged = { address: user.address, id: user.id, email: user.email };

    const roleRegistered = role.some((nameRole) => nameRole === user.role.name);

    if (!roleRegistered)
      return res.status(401).send("Usuario não possui acesso a essa rota!");

    return next();
  };
};
