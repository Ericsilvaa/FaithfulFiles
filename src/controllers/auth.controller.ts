import ContextStrategy from "../config/strategies/base/context.strategy"
import { UserEntity } from "../entities/postgres/user.entity"
import bcrypty from 'bcryptjs'
import TokenValidation from "../validations/token"
import { validate } from "class-validator"
import { Request, Response } from "express"
import { Role } from "../entities/postgres/roles.entity"
import { ObjectLiteral, Repository } from "typeorm"

export default class AuthController {
  constructor(private context: ContextStrategy, private repositoryRole?: Repository<Role>) { }

  async registerUser(req: Request, res: Response) {
    const { email, username, password_hash: password } = <UserEntity>req.body
    try {
      const password_hash = bcrypty.hashSync(password, 10)

      const emailExists = await this.context.findOne({ email });

      if (emailExists) res.status(404).json({ message: 'Email já cadastrado, Por favor escolha outro email!' });

      const token = TokenValidation.generateToken({ email, username })
      const user_role = await this.repositoryRole?.findOne({ where: { name: 'default' } }) as Role

      const newUser = new UserEntity(username, password_hash, email, user_role, token)

      // necessário realizar middleware
      const errors = await validate(newUser)

      if (errors.length !== 0) {
        return res.status(400).json(errors.map(err => {
          const [[validation, message]] = Object.entries({ ...err.constraints })

          return {
            type_error: validation,
            field_error: err.property,
            message_error: message
          }
        }))
      }


      await this.context.create(newUser)

      return res.status(201).json({ success: true, message: 'Usúario criado com sucesso!' })
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'deu ruim!' });
    }
  }


  async loginUser(req: Request, res: Response) {
    try {
      const { email, password_hash } = <UserEntity>req.body

      const user = await this.context.findOne({ email })
      if (!user) return res.status(404).json({ message: 'Email Inválido!' });

      if (!bcrypty.compareSync(password_hash, user.password_hash)) {
        return res
          .status(401)
          .json('Email ou senha inválido, verifique e tente novamente!');
      }

      const token = TokenValidation.generateToken(user)

      await this.context.update(user.id, { ...user, token })
      const userLogado = { ...user, token }
      Reflect.deleteProperty(userLogado, 'password_hash')

      return res.status(200).json({
        error: false,
        message: 'Cliente logado com sucesso!',
        user: userLogado
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'deu ruim!' });
    }
  }
}