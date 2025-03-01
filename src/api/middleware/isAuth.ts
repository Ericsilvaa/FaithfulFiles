import { NextFunction, Request, Response } from "express";
import TokenValidation from "../validations/token";
import { JwtPayload, decode } from "jsonwebtoken";

export default class Auth {
  static async isMember(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({
        error: true,
        message: "Erro: Necessário realizar login para acessar a página!",
      });

    const [bearer, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Erro: Usuario não autorizado, token incorreto",
      });
    }

    try {
      TokenValidation.validateToken(token);

      const { email, name } = decode(token) as JwtPayload;
      req.user = { email, name };

      return next();
    } catch (error) {
      return res.status(403).json({
        error: true,
        message: "Erro: Token Invalido",
      });
    }
  }
}
