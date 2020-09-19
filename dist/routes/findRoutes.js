"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SummonerFinder_1 = __importDefault(require("../controllers/SummonerFinder"));
const router = express_1.Router();
router.post('/', SummonerFinder_1.default.show);
router.post('/match', SummonerFinder_1.default.match);
exports.default = router;
//# sourceMappingURL=findRoutes.js.map