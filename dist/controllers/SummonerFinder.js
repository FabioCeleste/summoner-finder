"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const Champions_1 = require("../entity/Champions");
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
class SummonerFinder {
    async show(req, res) {
        try {
            const { region, summoner } = req.body;
            const summonerId = await SummonerFinder.getSummonerId(summoner, region);
            const arrayElo = await SummonerFinder.getSummonerInfo(summonerId.id, region);
            return res.json({
                summoner: summonerId,
                ranked: arrayElo
            });
        }
        catch {
            return res.json({ errors: ['Invocador não encontrado'] });
        }
    }
    async match(req, res) {
        fs_1.default.readFile(path_1.resolve(__dirname, '..', 'data', 'spells.json'), async (err, data) => {
            if (err)
                return err;
            const summonerJson = data.toString();
            const spellsObj = JSON.parse(summonerJson);
            const results = [];
            const { region, summoner } = req.body;
            const summonerId = await SummonerFinder.getSummonerId(summoner, region);
            try {
                const match = await SummonerFinder.getMatch(summonerId.id, region);
                for (const summoner of match.participants) {
                    const find = await SummonerFinder.getSummonerInfo(summoner.summonerId, region);
                    const champion = await SummonerFinder.getChampion(summoner.championId);
                    results.push({
                        id: summoner.id,
                        profileIconId: summoner.profileIconId,
                        summonerName: summoner.summonerName,
                        team: summoner.teamId,
                        spell1: spellsObj[summoner.spell1Id.toString()],
                        spell2: spellsObj[summoner.spell2Id.toString()],
                        ranked: find,
                        champion
                    });
                }
                return res.json({ results });
            }
            catch {
                return res.json({ errors: ['Invocador não esta em partida'] });
            }
        });
    }
    static async getSummonerId(summoner, region) {
        const findSummoner = await axios_1.default.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`, {
            headers: {
                'X-Riot-Token': process.env.RIOTKEY
            }
        });
        const findSummonerData = findSummoner.data;
        const summonerId = {
            id: findSummonerData.id,
            name: findSummonerData.name,
            profileIcon: findSummonerData.profileIconId
        };
        return summonerId;
    }
    static async getSummonerInfo(summonerId, region) {
        const summonerStats = await axios_1.default.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
            headers: {
                'X-Riot-Token': process.env.RIOTKEY
            }
        });
        const summonerStatsData = summonerStats.data;
        const arrayElo = [];
        arrayElo.pop();
        summonerStatsData.map(queue => {
            arrayElo.push({
                queueType: queue.queueType,
                tier: queue.tier,
                rank: queue.rank,
                leaguePoints: queue.leaguePoints,
                wins: queue.wins,
                losses: queue.losses
            });
        });
        return arrayElo;
    }
    static async getMatch(summonerId, region) {
        const match = await axios_1.default.get(`https://${region.toLowerCase()}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`, {
            headers: {
                'X-Riot-Token': process.env.RIOTKEY
            }
        });
        return match.data;
    }
    static async getChampion(championId) {
        const champ = await typeorm_1.getRepository(Champions_1.Champs).findOne({ where: { champId: championId } });
        return champ;
    }
}
exports.default = new SummonerFinder();
//# sourceMappingURL=SummonerFinder.js.map