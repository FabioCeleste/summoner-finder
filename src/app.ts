import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'

import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/tokenRoutes'
import summonerRoutes from './routes/summonerRoutes'
import findRoutes from './routes/findRoutes'
import champRoutes from './routes/champRoutes'

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
      this.express.use('/token', tokenRoutes)
      this.express.use('/summoner', summonerRoutes)
      this.express.use('/find', findRoutes)
      this.express.use('/champ', champRoutes)
    }
}

export default new App().express
