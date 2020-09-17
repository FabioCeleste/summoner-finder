import { Users } from '../entity/Users'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { UserBody } from '../types/userbody'
import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

class TokenController {
  async store (req: Request, res: Response) {
    const { email = '', password = '' } = req.body as UserBody
    if (!email || !password) {
      return res.json({ errors: ['Email or password invalid'] })
    }
    const user = await getRepository(Users).findOne({ where: { email } })
    if (!user) {
      return res.json({ errors: ['Invalid email'] })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      if (typeof process.env.JWTSECRET === 'string') {
        const token = jwt.sign({ email, user: user.username, id: user.id }, process.env.JWTSECRET)
        return res.json({ token })
      }
    }

    return res.json({ errors: ['invalid user'] })
  }
}

export default new TokenController()
