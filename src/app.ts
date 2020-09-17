import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'

import userRoutes from './routes/userRoutes'

dotenv.config()

class App {
    public express: express.Application

    public constructor () {
      this.express = express()
      this.middlewares()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      createConnection()
    }

    private routes (): void {
      this.express.use('/users', userRoutes)
    }
}

export default new App().express
