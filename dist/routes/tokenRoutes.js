"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TokenController_1 = __importDefault(require("../controllers/TokenController"));
const router = express_1.Router();
router.post('/', TokenController_1.default.store);
exports.default = router;
//# sourceMappingURL=tokenRoutes.js.map