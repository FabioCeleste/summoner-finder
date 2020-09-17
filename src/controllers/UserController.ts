import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Users } from '../entity/Users'
import bcrypt from 'bcrypt'

class UserController {
  async index (req: Request, res: Response) {
    const users = await getRepository(Users).find()
    return res.json(users)
  }

  async store (req: Request, res: Response) {
    const { username, password, email } = req.body
    const passwordHash = await bcrypt.hash(password, 8)
    const user = await getRepository(Users).save({ username, email, password: passwordHash })
    res.json(user)
  }

  async show (req: Request, res: Response) {
    const { id } = req.params
    const user = await getRepository(Users).findOne(id)
    return res.json(user)
  }

  async update (req: Request, res: Response) {
    const { username, password, email } = req.body
    const { id } = req.params
    const passwordHash = await bcrypt.hash(password, 8)
    const user = await getRepository(Users).update(id, { username, email, password: passwordHash })

    if (user.affected === 1) {
      const userUpdated = await getRepository(Users).findOne(id)
      return res.json(userUpdated)
    }

    res.json({ errors: ['user not found'] })
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
