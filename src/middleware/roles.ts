import { NextFunction, Request, Response } from "express"
import { dbDataSourcePostgres } from "../config/db/dataSource"

type RoleString = "admin" | "default"

export const roles = (role: RoleString[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user

    const user = await dbDataSourcePostgres.getRepository('UserEntity').findOne({ where: { email }, relations: ['role'] })

    if (!user) return res.status(401).send('User não cadastrado!')

    const roleRegistered = role.some((nameRole) => nameRole === user.role.name)

    if (!roleRegistered) return res.status(401).send("Usuario não possui acesso a essa rota!")

    return next()
  }
}