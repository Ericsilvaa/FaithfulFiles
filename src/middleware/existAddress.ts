import { NextFunction, Request, Response } from "express"

export const isAddress = (req: Request, res: Response, next: NextFunction) => {
  const { address } = req.userLogged

  if (!address) return res.status(401).json({ message: 'Conclua o cadastro! Cadastre seu endereço!' })

  return next()
}