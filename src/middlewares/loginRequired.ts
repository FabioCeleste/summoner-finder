import { Request, Response, NextFunction } from 'express'
import { Token } from '../types/token'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserVerify } from '../types/userVerify'
dotenv.config()

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
       export interface Request {
            userEmail: string
            userId: number
            user:string
       }
  }
}

// eslint-disable-next-line
async function loginRequired (req: Request, res: Response, next: NextFunction) {
  const { token = '' } = req.body as Token
  if (!token) {
    return res.json({ errors: ['Invalid Token'] })
  }
  if (typeof process.env.JWTSECRET === 'string') {
    try {
      const userVerify = jwt.verify(token, process.env.JWTSECRET)
      const { email, user, id } = userVerify as UserVerify
      req.userId = id
      req.userEmail = email
      req.user = user
    } catch {
      return res.json({ errors: 'Invalid Token' })
    }
  }

  return next()
}

export default loginRequired
