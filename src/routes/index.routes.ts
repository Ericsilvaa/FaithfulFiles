import express from "express";
import AuthRoute from './auth.routes'
import BookRoute from './book.routes'
import TransactionRoute from './transaction.routes'
import RoleRoute from './role.routes'
import AdminRoute from './admin.routes'

import PostgresStrategy from "../config/strategies/postgres/postgres.strategy";


const router = (app: express.Router) => {

  async function dbConnection() {
    const connection = PostgresStrategy.connect()
    return connection
  }
  dbConnection()

  app.use('/library/book', TransactionRoute)
  app.use('/library/auth/role', RoleRoute)
  app.use('/library/admin', AdminRoute)
  app.use('/library/auth', AuthRoute)
  app.use('/library/book', BookRoute)


}

export default router;
