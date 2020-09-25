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
    image: string
}

export interface SummonerBody {
    region: RegionsType
    summoner: string
}

export interface MatchSummoner {
    teamId: number
    spell1Id: number
    spell2Id: number
    championId: number
    summonerName: string
    summonerId: string
    id: string
    profileIconId:string,

}

export interface MatchInfo {
    participants: MatchSummoner[]
}

export interface SummonerId{
    id: string
    name: string
    profileIconId: string
}
