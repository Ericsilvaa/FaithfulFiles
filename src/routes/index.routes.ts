import express from "express";

const router = (app: express.Router) => {
  app.get('/', (req, res) => {
    console.log('welcome the library')
  })
}

export default router;
