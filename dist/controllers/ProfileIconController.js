"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Rank_1 = require("../entity/Rank");
class ProfileIconController {
    async champs2(req, res) {
        const elos = [
            'BRONZE', 'CHALLENGER', 'DIAMOND', 'GOLD', 'GRANDMASTER', 'IRON', 'MASTER', 'PLATINUM', 'SILVER'
        ];
        const elosfiles = ['Emblem_Bronze.png',
            'Emblem_Challenger.png',
            'Emblem_Diamond.png',
            'Emblem_Gold.png',
            'Emblem_Grandmaster.png',
            'Emblem_Iron.png',
            'Emblem_Master.png',
            'Emblem_Platinum.png',
            'Emblem_Silver.png'
        ];
        for (let i = 0; i < 9; i++) {
            const save = await typeorm_1.getRepository(Rank_1.Rank).save({ filename: elosfiles[i], searchname: elos[i] });
            console.log(save);
        }
        res.send('foi');
    }
}
exports.default = new ProfileIconController();
//# sourceMappingURL=ProfileIconController.js.map