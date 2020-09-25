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
const Rank_1 = require("../entity/Rank");
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
        catch (e) {
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
                    const championImage = `${process.env.URL}/champion/${champion === null || champion === void 0 ? void 0 : champion.fullImage}`;
                    const spell1 = spellsObj[summoner.spell1Id.toString()];
                    const spell2 = spellsObj[summoner.spell2Id.toString()];
                    const spellone = `${process.env.URL}/spells/${spell1.image.full}`;
                    const spelltwo = `${process.env.URL}/spells/${spell2.image.full}`;
                    results.push({
                        id: summoner.id,
                        profileIconId: `${process.env.URL}/profileicon/${summoner.profileIconId}.png`,
                        summonerName: summoner.summonerName,
                        team: summoner.teamId,
                        spell1: spellone,
                        spell2: spelltwo,
                        ranked: find,
                        champion: championImage
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
            profileIcon: `${process.env.URL}/profileicon/${findSummonerData.profileIconId}.png`
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
        summonerStatsData.map(async (queue) => {
            arrayElo.push({
                queueType: queue.queueType,
                tier: queue.tier,
                rank: queue.rank,
                leaguePoints: queue.leaguePoints,
                wins: queue.wins,
                losses: queue.losses,
                image: ''
            });
        });
        for (const elo of arrayElo) {
            async function getData() {
                const imagename = await typeorm_1.getRepository(Rank_1.Rank).findOne({ where: { searchname: elo.tier } });
                if (typeof (imagename === null || imagename === void 0 ? void 0 : imagename.filename) === 'string') {
                    elo.image = `${process.env.URL}/rankedEmblems/${imagename.filename}`;
                }
            }
            await getData();
        }
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