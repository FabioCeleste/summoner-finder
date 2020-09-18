import { RegionsType } from './regions'

export interface SummonerType {
    summoner:string
}

export interface FindSummoner {
    id: string
    name: string
}

export interface SummonerStatsData {
    queueType: string,
    tier: string
    rank: string
    leaguePoints: number
    wins: number
    losses: number
}

export interface SummonerBody {
    region: RegionsType
    summoner: string
}
