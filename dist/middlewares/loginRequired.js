"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function loginRequired(req, res, next) {
    const { token = '' } = req.body;
    if (!token) {
        return res.json({ errors: ['Invalid Token'] });
    }
    if (typeof process.env.JWTSECRET === 'string') {
        try {
            const userVerify = jsonwebtoken_1.default.verify(token, process.env.JWTSECRET);
            const { email, user, id } = userVerify;
            req.userId = id;
            req.userEmail = email;
            req.user = user;
        }
        catch {
            return res.json({ errors: 'Invalid Token' });
        }
    }
    return next();
}
exports.default = loginRequired;
//# sourceMappingURL=loginRequired.js.map