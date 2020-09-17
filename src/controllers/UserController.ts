import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Users } from '../entity/Users'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { UserBody } from '../types/userbody'

class UserController {
  async index (req: Request, res: Response) {
    const users = await getRepository(Users).find()
    return res.json(users)
  }

  async store (req: Request, res: Response) {
    const { username, password, email } = req.body as UserBody
    const errors: string[] = []

    if (!validator.isEmail(email)) errors.push('Invalid Email')
    if (password.length < 5 || password.length > 255) errors.push('Password must have between 6 and 255 characters')
    if (username.length < 2 || username.length > 255) errors.push('User must have between 3 and 255 characters')

    try {
      if (errors.length === 0) {
        const passwordHash = await bcrypt.hash(password, 8)
        const user = await getRepository(Users).save({ username, email, password: passwordHash })
        return res.json(user)
      }
      return res.json({ errors: errors })
    } catch (e) {
      return res.json({ errors: ['Email already used'] })
    }
  }

  async show (req: Request, res: Response) {
    const { id } = req.params
    if (!id) return res.json({ errors: ['Invalid user id'] })
    const user = await getRepository(Users).findOne(id)
    if (!user) return res.json({ errors: ['User not found'] })
    return res.json(user)
  }

  async update (req: Request, res: Response) {
    const { username, password, email } = req.body as UserBody
    const { id } = req.params
    if (!id) return res.json({ errors: ['Invalid id'] })

    const errors: string[] = []

    if (!validator.isEmail(email)) errors.push('Invalid Email')
    if (username.length < 2 && username.length > 255) errors.push('User must have between 3 and 255 characters')
    if (password.length < 5 && password.length > 255) errors.push('Password must have between 6 and 255 characters')

    try {
      if (errors.length === 0) {
        const passwordHash = await bcrypt.hash(password, 8)
        const user = await getRepository(Users).update(id, { username, email, password: passwordHash })
        if (user.affected === 1) {
          const userUpdated = await getRepository(Users).findOne(id)
          return res.json(userUpdated)
        }
      }
    } catch {
      return res.json({ errors: ['Email already used'] })
    }

    res.json({ errors: errors })
  }

  async delete (req: Request, res:Response) {
    const { id } = req.params
    const user = await getRepository(Users).delete(id)
    if (user.affected === 1) {
      return res.json({ message: 'User deleted' })
    }
    return res.json({ errors: ['User not found'] })
  }
}

export default new UserController()
