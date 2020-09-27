"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Summoner_1 = require("../entity/Summoner");
const Users_1 = require("../entity/Users");
class SummonerController {
    async store(req, res) {
        const { summoner, profileicon, region } = req.body;
        const user = await typeorm_1.getRepository(Users_1.Users).findOne(req.userId);
        const summonerSave = await typeorm_1.getRepository(Summoner_1.Summoner).save({ summoner: summoner, profileicon, region, users: user });
        res.json(summonerSave);
    }
    async index(req, res) {
        const user = await typeorm_1.getRepository(Users_1.Users).findOne(req.userId, { relations: ['summoner'] });
        const summoners = user === null || user === void 0 ? void 0 : user.summoner;
        return res.json({ summoners });
    }
    async delete(req, res) {
        const user = await typeorm_1.getRepository(Users_1.Users).findOne(req.userId);
        const summoner = await typeorm_1.getRepository(Summoner_1.Summoner).delete({ summoner: req.body.summoner, users: user });
        if (summoner.affected) {
            res.json({ delete: true });
        }
        else {
            res.json({ delete: false });
        }
    }
}
exports.default = new SummonerController();
//# sourceMappingURL=SummonerController.js.map