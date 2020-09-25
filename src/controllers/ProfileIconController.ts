import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Rank } from '../entity/Rank'

class ProfileIconController {
  async champs2 (req: Request, res: Response) {
    const elos = [
      'BRONZE', 'CHALLENGER', 'DIAMOND', 'GOLD', 'GRANDMASTER', 'IRON', 'MASTER', 'PLATINUM', 'SILVER'
    ]
    const elosfiles = ['Emblem_Bronze.png',
      'Emblem_Challenger.png',
      'Emblem_Diamond.png',
      'Emblem_Gold.png',
      'Emblem_Grandmaster.png',
      'Emblem_Iron.png',
      'Emblem_Master.png',
      'Emblem_Platinum.png',
      'Emblem_Silver.png'
    ]
    for (let i = 0; i < 9; i++) {
      const save = await getRepository(Rank).save({ filename: elosfiles[i], searchname: elos[i] })
      console.log(save)
    }
    res.send('foi')
  }
}

export default new ProfileIconController()
