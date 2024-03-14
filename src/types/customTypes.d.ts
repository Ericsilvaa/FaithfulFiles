import { IAddress } from "../api/interfaces/IAddress"

interface UserRequest {
  user: {
    email: string
    username: string
  },
  userLogged: {
    id: string | number
    email: string,
    address: IAddress | undefined
  }
}

declare module 'express-serve-static-core' {
  interface Request extends UserRequest { }
}