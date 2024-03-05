import { Repository } from "typeorm";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { Role } from "../entities/postgres/roles.entity";
import { Request, Response, response } from "express";
import { UserEntity } from "../entities/postgres/user.entity";
import { newFormatUsers } from "../utils/newFormartUsers";

export default class AdminController {
  constructor(private context: ContextStrategy, private repositoryRole?: Repository<Role>) { }

  async getAllUsers(req: Request, res: Response) {
    try {
      const [allUsers, count]: [UserEntity[], number] = await this.context.findAndCount({ relations: ['role'] })

      const { users_admin, users_default, users_owner } = newFormatUsers(allUsers)

      return res.status(200).json({
        users_admin,
        users_default,
        users_owner,
        total_users: count
      })


    } catch (error) {
      return res
        .writeHead(500)
    }
  }

  async updateUserRole(req: Request, res: Response) {
    const { email, role } = req.body

    try {
      const [userPromise, rolePromise] = await Promise.allSettled([
        this.context.findOne({ email }),
        this.repositoryRole?.findOne({ where: { name: role } })
      ]);

      const userResult = userPromise as PromiseSettledResult<UserEntity>;
      const roleResult = rolePromise as PromiseSettledResult<Role>;

      if (userResult.status === 'rejected') {
        return res.status(400).send({ error: 'Usuario não encontrado!' });
      }

      if (roleResult.status === 'rejected') {
        return res.status(400).send({ error: 'Regra não encontrada!' });
      }

      const userEntity = userResult.status === 'fulfilled' ? userResult.value : null;
      const roleEntity = roleResult.status === 'fulfilled' ? roleResult.value : null;

      if (userEntity && roleEntity) {
        const newUser = UserEntity.createUser({ ...userEntity, role: roleEntity })
        const updateUser = await this.context.update(Number(userEntity?.id), newUser)

        return res.status(200).send({ message: 'Usuario atualizado' })
      }

    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'deu ruim!' });
    }
  }
}


