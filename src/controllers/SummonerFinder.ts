import { Request, Response } from 'express'
import axios from 'axios'
import { RegionsType } from '../types/regions'
import dotenv from 'dotenv'
import { FindSummoner, SummonerBody, SummonerStatsData } from '../types/summoner'
dotenv.config()

class SummonerFinder {
  async show (req: Request, res: Response) {
    const { region, summoner } = req.body as SummonerBody
    const arrayElo = await SummonerFinder.getSummoner(summoner, region)
    console.log(arrayElo)

    return res.json({
      summoner: summoner,
      ranked: arrayElo
    })
  }

  static async getSummoner (summoner: string, region: RegionsType) {
    const findSummoner = await axios.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, {
      headers: {
        'X-Riot-Token': process.env.RIOTKEY as string
      }
    })
    const findSummonerData = findSummoner.data

    const summonerStats = await axios.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/league/v4/entries/by-summoner/${findSummonerData.id}`, {
      headers: {
        'X-Riot-Token': process.env.RIOTKEY as string
      }
    })
    const summonerStatsData = summonerStats.data as SummonerStatsData[]

    const arrayElo: SummonerStatsData[] = []
    arrayElo.pop()
    summonerStatsData.map(queue => {
      arrayElo.push({
        queueType: queue.queueType,
        tier: queue.tier,
        rank: queue.rank,
        leaguePoints: queue.leaguePoints,
        wins: queue.wins,
        losses: queue.losses
      })
    })
    return arrayElo
  }
}

export default new SummonerFinder()

// const sum = new SummonerFinder()
// const a = sum.getSummoner('Sr Stronda', 'BR1')
// console.log(a)
