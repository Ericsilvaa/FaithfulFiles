import { Request, Response, NextFunction } from "express";

/**
 * Middleware para log de requisições HTTP
 */
export const logRequests = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
};

/**
 * Middleware global para tratamento de erros
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ error: err.message });
};
