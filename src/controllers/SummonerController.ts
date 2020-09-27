import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Summoner } from '../entity/Summoner'
import { Users } from '../entity/Users'
import { SummonerType } from '../types/summoner'

class SummonerController {
  async store (req: Request, res: Response) {
    const { summoner, profileicon, region } = req.body as SummonerType

    const user = await getRepository(Users).findOne(req.userId)
    const summonerSave = await getRepository(Summoner).save({ summoner: summoner, profileicon, region, users: user })
    res.json(summonerSave)
  }

  async index (req: Request, res: Response) {
    const user = await getRepository(Users).findOne(req.userId, { relations: ['summoner'] })
    const summoners = user?.summoner
    return res.json({ summoners })
  }

  async delete (req: Request, res:Response) {
    const user = await getRepository(Users).findOne(req.userId)
    const summoner = await getRepository(Summoner).delete({ summoner: req.body.summoner, users: user })
    if (summoner.affected) {
      res.json({ delete: true })
    } else {
      res.json({ delete: false })
    }
  }
}

export default new SummonerController()
