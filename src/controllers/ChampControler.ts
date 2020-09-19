import { Request, Response } from 'express'
import { Champs } from '../entity/Champions'
import fs from 'fs'
import { ChampType } from '../types/Champ'
import { getRepository } from 'typeorm'
import { resolve } from 'path'

class ChampController {
  async champs1 (req: Request, res: Response) {
    fs.readFile(resolve(__dirname, '..', 'data', 'champs1.json'), (err, data) => {
      if (err) return console.log(err)
      const stringData = data.toString()
      const arrayChampions: ChampType[] = JSON.parse(stringData)
      arrayChampions.map(async element => {
        await getRepository(Champs).save({ champId: element.key, champName: element.id, sprite: element.image.sprite, fullImage: element.image.full })
      })
    })
    return res.json({ save: true })
  }
}

export default new ChampController()
