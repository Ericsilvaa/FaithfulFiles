import { Request, Response } from "express"
import { Role } from "../../database/entities/postgres/roles.entity";
import ContextStrategy from "../../database/strategies/base/context.strategy";



export default class RoleController {

  constructor(private context: ContextStrategy) { }

  async createRole(req: Request, res: Response) {
    const { role } = req.body
    try {
      const roleEntity = await this.context.findOne({ name: role })
      if (roleEntity) res.status(401).json({ message: 'Regra já cadastrada!' });


      const newRoleUser = Role.createRole({
        id: 0,
        name: role,
        users: []
      })

      await this.context.save(newRoleUser)

      return res.status(201).json({ success: true, message: 'Regra criada com sucesso!' })
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }

  }

  async updateRole(req: Request, res: Response) {
    const { role_id } = req.params
    const newPermissions = req.body

    try {
      const roleName = await this.context.findOne({ id: role_id })
      if (!roleName) res.status(401).json({ message: 'Role não cadastrada' });

      const newRolePermissions = {
        ...roleName,
        newPermissions
      }

      const { affected } = await this.context.update(role_id, newRolePermissions)
      return res.status(200).json({ message: 'Role Atualizado', success: affected === 1 ? true : false });

    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }





}

