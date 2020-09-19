"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = require("../entity/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenController {
    async store(req, res) {
        const { email = '', password = '' } = req.body;
        if (!email || !password) {
            return res.json({ errors: ['Email or password invalid'] });
        }
        const user = await typeorm_1.getRepository(Users_1.Users).findOne({ where: { email } });
        if (!user) {
            return res.json({ errors: ['Invalid email'] });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (validPassword) {
            if (typeof process.env.JWTSECRET === 'string') {
                const token = jsonwebtoken_1.default.sign({ email, user: user.username, id: user.id }, process.env.JWTSECRET);
                return res.json({ token });
            }
        }
        return res.json({ errors: ['invalid user'] });
    }
}
exports.default = new TokenController();
//# sourceMappingURL=TokenController.js.map