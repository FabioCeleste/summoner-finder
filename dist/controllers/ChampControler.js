"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Champions_1 = require("../entity/Champions");
const fs_1 = __importDefault(require("fs"));
const typeorm_1 = require("typeorm");
const path_1 = require("path");
class ChampController {
    async champs1(req, res) {
        fs_1.default.readFile(path_1.resolve(__dirname, '..', 'data', 'champs1.json'), (err, data) => {
            if (err)
                return console.log(err);
            const stringData = data.toString();
            const arrayChampions = JSON.parse(stringData);
            arrayChampions.map(async (element) => {
                await typeorm_1.getRepository(Champions_1.Champs).save({ champId: element.key, champName: element.id, sprite: element.image.sprite, fullImage: element.image.full });
            });
        });
        return res.json({ save: true });
    }
}
exports.default = new ChampController();
//# sourceMappingURL=ChampControler.js.map