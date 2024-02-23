import { NextFunction, Request, Response } from "express";
import TokenValidation from "../validations/token";

export default class Auth {
  static async isMember(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;


    // try {
    //   if (tokenCookie && !TokenValidation.validateToken(tokenCookie)) throw new Error("Error");
    // } catch (error) {
    //   return res.status(403).json({
    //     error: true,
    //     message: "Token invalido, faça login novamente!",
    //   });
    // }

    if (!authHeader)
      return res.status(400).json({
        error: true,
        message: "Erro: Necessário realizar login para acessar a página!",
      });

    const [bearer, token] = authHeader.split(" ");

    if (!token) {
      return res.status(403).json({
        error: true,
        message: "Erro: Usuario não autorizado, token incorreto",
      });
    }

    try {
      TokenValidation.validateToken(token)

      return next();
    } catch (error) {
      return res.status(403).json({
        error: true,
        message: "Erro: Token Invalido",
      });
    }
  }
}
