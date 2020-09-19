"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Users_1 = require("../entity/Users");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async index(req, res) {
        const users = await typeorm_1.getRepository(Users_1.Users).find();
        return res.json(users);
    }
    async store(req, res) {
        const { username, password, email } = req.body;
        const errors = [];
        if (!validator_1.default.isEmail(email))
            errors.push('Invalid Email');
        if (password.length < 5 || password.length > 255)
            errors.push('Password must have between 6 and 255 characters');
        if (username.length < 2 || username.length > 255)
            errors.push('User must have between 3 and 255 characters');
        try {
            if (errors.length === 0) {
                const passwordHash = await bcrypt_1.default.hash(password, 8);
                const user = await typeorm_1.getRepository(Users_1.Users).save({ username, email, password: passwordHash });
                return res.json(user);
            }
            return res.json({ errors: errors });
        }
        catch (e) {
            return res.json({ errors: ['Email already used'] });
        }
    }
    async show(req, res) {
        const { id } = req.params;
        if (!id)
            return res.json({ errors: ['Invalid user id'] });
        const user = await typeorm_1.getRepository(Users_1.Users).findOne(id, { relations: ['summoner'] });
        if (!user)
            return res.json({ errors: ['User not found'] });
        return res.json(user);
    }
    async update(req, res) {
        const { username, password, email } = req.body;
        const { id } = req.params;
        if (!id)
            return res.json({ errors: ['Invalid id'] });
        const errors = [];
        if (!validator_1.default.isEmail(email))
            errors.push('Invalid Email');
        if (username.length < 2 && username.length > 255)
            errors.push('User must have between 3 and 255 characters');
        if (password.length < 5 && password.length > 255)
            errors.push('Password must have between 6 and 255 characters');
        try {
            if (errors.length === 0) {
                const passwordHash = await bcrypt_1.default.hash(password, 8);
                const user = await typeorm_1.getRepository(Users_1.Users).update(id, { username, email, password: passwordHash });
                if (user.affected === 1) {
                    const userUpdated = await typeorm_1.getRepository(Users_1.Users).findOne(id);
                    return res.json(userUpdated);
                }
            }
        }
        catch {
            return res.json({ errors: ['Email already used'] });
        }
        res.json({ errors: errors });
    }
    async delete(req, res) {
        const { id } = req.params;
        const user = await typeorm_1.getRepository(Users_1.Users).delete(id);
        if (user.affected === 1) {
            return res.json({ message: 'User deleted' });
        }
        return res.json({ errors: ['User not found'] });
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map