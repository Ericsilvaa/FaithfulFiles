import { Repository } from "typeorm";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { Role } from "../entities/postgres/roles.entity";
import { Request, Response, response } from "express";
import { UserEntity } from "../entities/postgres/user.entity";

export default class AdminController {
  constructor(private context: ContextStrategy, private repositoryRole?: Repository<Role>) { }

  async getAllUsers(req: Request, res: Response) {
    try {
      const [allUsers, count]: [UserEntity[], number] = await this.context.findAndCount({ relations: ['role'] })

      const newFormatUsers = allUsers.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name
      }))

      return res.status(200).json({
        users_admin: newFormatUsers.filter(user => user.role === 'admin'),
        users_default: newFormatUsers.filter(user => user.role === 'default'),
        total_users: count
      })


    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'deu ruim!' });
    }
  }

  async updateUserRole(req: Request, res: Response) {
    const { email, role } = req.params

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


