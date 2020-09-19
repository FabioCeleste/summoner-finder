"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Summoner_1 = require("../entity/Summoner");
const Users_1 = require("../entity/Users");
class SummonerController {
    async store(req, res) {
        const { summoner } = req.body;
        const user = await typeorm_1.getRepository(Users_1.Users).findOne(req.userId);
        const summonerSave = await typeorm_1.getRepository(Summoner_1.Summoner).save({ summoner: summoner, users: user });
        res.json(summonerSave);
    }
    async index(req, res) {
        const user = await typeorm_1.getRepository(Users_1.Users).findOne(req.userId, { relations: ['summoner'] });
        const summoners = user === null || user === void 0 ? void 0 : user.summoner;
        return res.json({ summoners });
    }
}
exports.default = new SummonerController();
//# sourceMappingURL=SummonerController.js.map