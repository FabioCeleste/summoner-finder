import { Request, Response } from 'express'
import axios from 'axios'
import { resolve } from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

import { Champs } from '../entity/Champions'

import { RegionsType } from '../types/regions'
import { MatchInfo, SummonerBody, SummonerStatsData } from '../types/summoner'
import { getRepository } from 'typeorm'
import { SummonerSpells } from '../types/spells'

dotenv.config()

class SummonerFinder {
  async show (req: Request, res: Response) {
    const { region, summoner } = req.body as SummonerBody
    const summonerId = await SummonerFinder.getSummonerId(summoner, region)
    const arrayElo = await SummonerFinder.getSummonerInfo(summonerId, region)

    return res.json({
      summoner: summoner,
      ranked: arrayElo
    })
  }

  async match (req: Request, res: Response) {
    fs.readFile(resolve(__dirname, '..', 'data', 'spells.json'), async (err, data) => {
      if (err) return err
      const summonerJson = data.toString()
      const spellsObj = JSON.parse(summonerJson) as SummonerSpells

      const results = []
      const { region, summoner } = req.body as SummonerBody
      const summonerId = await SummonerFinder.getSummonerId(summoner, region)
      const match = await SummonerFinder.getMatch(summonerId, region)

      for (const summoner of match.participants) {
        const find = await SummonerFinder.getSummonerInfo(summoner.summonerId, region)
        const champion = await SummonerFinder.getChampion(summoner.championId)

        results.push({
          team: summoner.teamId,
          summonerName: summoner.summonerName,
          spell1: spellsObj[summoner.spell1Id.toString()],
          spell2: spellsObj[summoner.spell2Id.toString()],
          ranked: find,
          champion
        })
      }

      return res.json({ results })
    })
  }

  static async getSummonerId (summoner:string, region: RegionsType) {
    const findSummoner = await axios.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, {
      headers: {
        'X-Riot-Token': process.env.RIOTKEY as string
      }
    })
    const findSummonerData = findSummoner.data

    return findSummonerData.id
  }

  static async getSummonerInfo (summonerId: string, region: RegionsType) {
    const summonerStats = await axios.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
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

  static async getMatch (summonerId:string, region: RegionsType) {
    const match = await axios.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`, {
      headers: {
        'X-Riot-Token': process.env.RIOTKEY as string
      }
    })
    return match.data as MatchInfo
  }

  static async getChampion (championId: number) {
    const champ = await getRepository(Champs).findOne({ where: { champId: championId } })
    return champ
  }
}

export default new SummonerFinder()
