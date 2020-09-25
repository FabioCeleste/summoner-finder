"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChampControler_1 = __importDefault(require("../controllers/ChampControler"));
const ProfileIconController_1 = __importDefault(require("../controllers/ProfileIconController"));
const router = express_1.Router();
router.get('/1', ChampControler_1.default.champs1);
router.get('/2', ProfileIconController_1.default.champs2);
exports.default = router;
//# sourceMappingURL=champRoutes.js.map