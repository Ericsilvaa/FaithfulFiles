import { Response } from "express";

type ResponseType = {
  res: Response;
  status: number;
  message: string;
  success?: boolean;
  data?: any;
  error?: any;
};

export const responseHandler = ({
  res,
  status,
  message,
  success = status < 400,
  data = null,
  error = null,
}: ResponseType) => {
  return res.status(status).json({
    success,
    message,
    ...(data && { data }),
    ...(error && { error }),
  });
};
