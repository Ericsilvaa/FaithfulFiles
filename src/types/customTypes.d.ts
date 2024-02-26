import { Request } from 'express';

interface UserRequest {
  user: {
    email: string
    username: string
  }
}

declare module 'express-serve-static-core' {
  interface Request extends UserRequest { }
}