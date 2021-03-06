"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const router = express_1.Router();
router.get('/', loginRequired_1.default, UserController_1.default.index);
router.get('/show/:id', UserController_1.default.show);
router.put('/update/:id', UserController_1.default.update);
router.post('/', UserController_1.default.store);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map