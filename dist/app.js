"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tokenRoutes_1 = __importDefault(require("./routes/tokenRoutes"));
const summonerRoutes_1 = __importDefault(require("./routes/summonerRoutes"));
const findRoutes_1 = __importDefault(require("./routes/findRoutes"));
const champRoutes_1 = __importDefault(require("./routes/champRoutes"));
dotenv_1.default.config();
class App {
    constructor() {
        this.express = express_1.default();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
        typeorm_1.createConnection();
    }
    routes() {
        this.express.use('/users', userRoutes_1.default);
        this.express.use('/token', tokenRoutes_1.default);
        this.express.use('/summoner', summonerRoutes_1.default);
        this.express.use('/find', findRoutes_1.default);
        this.express.use('/champ', champRoutes_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map