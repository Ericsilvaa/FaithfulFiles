import express from "express";
import AuthRoute from './auth.routes'
import UserRoute from './user.routes'
import BookRoute from './book.routes'
import AuthorRoute from './author.routes'
import PublisherRoute from './publisher.routes'
import TransactionRoute from './transaction.routes'
import RoleRoute from './role.routes'
import AdminRoute from './admin.routes'

import PostgresStrategy from "../../database/strategies/postgres/postgres.strategy";


const router = (app: express.Router) => {

  async function dbConnection() {
    const connection = PostgresStrategy.connect()
    return connection
  }
  dbConnection()

  app.use('/library/profile', UserRoute)
  app.use('/library/book/transaction', TransactionRoute)
  app.use('/library/auth/role', RoleRoute)
  app.use('/library/admin', AdminRoute)
  app.use('/library/auth', AuthRoute)
  app.use('/library/book', BookRoute)
  app.use('/library/author', AuthorRoute)
  app.use('/library/publisher', PublisherRoute)


}

export default router;
