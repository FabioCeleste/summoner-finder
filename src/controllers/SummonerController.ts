import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Summoner } from '../entity/Summoner'
import { Users } from '../entity/Users'
import { SummonerType } from '../types/summoner'

class SummonerController {
  async store (req: Request, res: Response) {
    const { summoner } = req.body as SummonerType

    const user = await getRepository(Users).findOne(req.userId)
    const summonerSave = await getRepository(Summoner).save({ summoner: summoner, users: user })
    res.json(summonerSave)
  }

  async index (req: Request, res: Response) {
    const user = await getRepository(Users).findOne(req.userId, { relations: ['summoner'] })
    const summoners = user?.summoner
    return res.json({ summoners })
  }
}

export default new SummonerController()
