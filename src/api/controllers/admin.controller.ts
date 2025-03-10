import { Repository } from "typeorm";
import { Request, Response } from "express";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import { newFormatUsers } from "../utils/newFormartUsers";
import { UserRole } from "../../entities/users/user_roles.entity";
import { User } from "../../entities/users/users.entity";

export default class AdminController {
  constructor(
    private context: ContextStrategy,
    private repositoryRole?: Repository<UserRole>,
  ) {}

  async getAllUsers(req: Request, res: Response) {
    try {
      const [allUsers, count]: [User[], number] =
        await this.context.findAndCount({ relations: ["role"] });

      const { users_admin, users_default, users_moderator } =
        newFormatUsers(allUsers);

      return res.status(200).json({
        users_admin,
        users_default,
        users_moderator,
        total_users: count,
      });
    } catch (error) {
      return res.writeHead(500);
    }
  }

  async updateUserRole(req: Request, res: Response) {
    const { email, role } = req.body;

    try {
      const [userPromise, rolePromise] = await Promise.allSettled([
        this.context.findOne({ email }),
        this.repositoryRole?.findOne({ where: { user: role } }),
      ]);

      const userResult = userPromise as PromiseSettledResult<User>;
      const roleResult = rolePromise as PromiseSettledResult<UserRole>;

      if (userResult.status === "rejected") {
        return res.status(400).send({ error: "Usuario não encontrado!" });
      }

      if (roleResult.status === "rejected") {
        return res.status(400).send({ error: "Regra não encontrada!" });
      }

      const userEntity =
        userResult.status === "fulfilled" ? userResult.value : null;
      const roleEntity =
        roleResult.status === "fulfilled" ? roleResult.value : null;

      if (userEntity && roleEntity) {
        const newUser = User.create({
          ...userEntity,
        });

        const updateUser = await this.context.update(
          Number(userEntity?.id),
          newUser,
        );

        return res.status(200).send({ message: "Usuario atualizado" });
      }
    } catch (error) {
      return res.status(500).json({ error, message: "deu ruim!" });
    }
  }
}
