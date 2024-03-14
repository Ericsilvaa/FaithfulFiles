import { Request, Response } from "express";
import { UserEntity } from "../../database/entities/postgres/user.entity";
import ContextStrategy from "../../database/strategies/base/context.strategy";


type userWithoutPassword = Omit<UserEntity, 'password_hash'>

export default class UserController {
  constructor(private context: ContextStrategy) { }

  async getCurrentUser(req: Request, res: Response) {
    const { email } = req.user

    try {
      const userCurrent = await this.context.findOne({ email }) as UserEntity

      if (!userCurrent) return res.status(404).send('Usuario não cadastrado')

      const user: userWithoutPassword = userCurrent
      Reflect.deleteProperty(user, 'password_hash')

      return res.status(200).json({ user })

    } catch (error) {
      console.log('error on getCurrentUser', error)
      console.error(error)
    }
  }

  async updateUser(req: Request, res: Response) {
    const { email } = req.user
    const user = <UserEntity>req.body

    try {
      const userCurrent = await this.context.findOne({ email }) as UserEntity


      if (!userCurrent) return res.status(404).send('Usuario não cadastrado')

      Reflect.deleteProperty(user, 'password_hash')
      const newUser = {
        ...userCurrent,
        ...user
      }

      const { affected } = await this.context.update(Number(userCurrent.id), newUser)

      return res.status(200).json({ message: 'Usuario Atualizado', success: affected === 1 ? true : false });
    } catch (error) {
      console.log('error on updateUser', error)
      console.error(error)
    }


  }

}