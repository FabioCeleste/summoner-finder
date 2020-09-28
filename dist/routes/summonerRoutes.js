"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SummonerController_1 = __importDefault(require("../controllers/SummonerController"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const router = express_1.Router();
router.post('/', loginRequired_1.default, SummonerController_1.default.store);
router.post('/delete', loginRequired_1.default, SummonerController_1.default.delete);
router.post('/favs', loginRequired_1.default, SummonerController_1.default.index);
exports.default = router;
//# sourceMappingURL=summonerRoutes.js.map