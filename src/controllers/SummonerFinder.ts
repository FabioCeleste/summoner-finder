import { Request, Response } from 'express'
import axios from 'axios'
import { resolve } from 'path'
import dotenv from 'dotenv'
import fs from 'fs'

import { Champs } from '../entity/Champions'

import { RegionsType } from '../types/regions'
import { MatchInfo, SummonerBody, SummonerId, SummonerStatsData } from '../types/summoner'
import { getRepository } from 'typeorm'
import { SummonerSpells } from '../types/spells'

import { Rank } from '../entity/Rank'

dotenv.config()

class SummonerFinder {
  async show (req: Request, res: Response) {
    try {
      const { region, summoner } = req.body as SummonerBody
      const summonerId = await SummonerFinder.getSummonerId(summoner, region)
      const arrayElo = await SummonerFinder.getSummonerInfo(summonerId.id, region)

      return res.json({
        summoner: summonerId,
        ranked: arrayElo
      })
    } catch (e) {
      return res.json({ errors: ['Invocador não encontrado'] })
    }
  }

  async match (req: Request, res: Response) {
    fs.readFile(resolve(__dirname, '..', 'data', 'spells.json'), async (err, data) => {
      if (err) return err
      const summonerJson = data.toString()
      const spellsObj = JSON.parse(summonerJson) as SummonerSpells

      const results = []
      const { region, summoner } = req.body as SummonerBody
      const summonerId = await SummonerFinder.getSummonerId(summoner, region)
      try {
        const match = await SummonerFinder.getMatch(summonerId.id, region)

        for (const summoner of match.participants) {
          const find = await SummonerFinder.getSummonerInfo(summoner.summonerId, region)
          const champion = await SummonerFinder.getChampion(summoner.championId)
          const championImage = `${process.env.URL}/champion/${champion?.fullImage}`
          const spell1 = spellsObj[summoner.spell1Id.toString()]
          const spell2 = spellsObj[summoner.spell2Id.toString()]
          const spellone = `${process.env.URL}/spells/${spell1.image.full}`
          const spelltwo = `${process.env.URL}/spells/${spell2.image.full}`

          results.push({
            id: summoner.id,
            profileIconId: `${process.env.URL}/profileicon/${summoner.profileIconId}.png`,
            summonerName: summoner.summonerName,
            team: summoner.teamId,
            spell1: spellone,
            spell2: spelltwo,
            ranked: find,
            champion: championImage
          })
        }
        return res.json({ results })
      } catch {
        return res.json({ errors: ['Invocador não esta em partida'] })
      }
    })
  }

  static async getSummonerId (summoner:string, region: RegionsType) {
    const findSummoner = await axios.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, {
      headers: {
        'X-Riot-Token': process.env.RIOTKEY as string
      }
    })
    const findSummonerData: SummonerId = findSummoner.data

    const summonerId = {
      id: findSummonerData.id,
      name: findSummonerData.name,
      profileIcon: `${process.env.URL}/profileicon/${findSummonerData.profileIconId}.png`
    }

    return summonerId
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
    summonerStatsData.map(async queue => {
      arrayElo.push({
        queueType: queue.queueType,
        tier: queue.tier,
        rank: queue.rank,
        leaguePoints: queue.leaguePoints,
        wins: queue.wins,
        losses: queue.losses,
        image: ''
      })
    })
    for (const elo of arrayElo) {
      async function getData () {
        const imagename = await getRepository(Rank).findOne({ where: { searchname: elo.tier } })
        if (typeof imagename?.filename === 'string') {
          elo.image = `${process.env.URL}/rankedEmblems/${imagename.filename}`
        }
      }
      await getData()
    }
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
