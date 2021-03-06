"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summoner = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let Summoner = class Summoner {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Summoner.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "summoner", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "profileicon", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "region", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Users_1.Users, users => users.summoner),
    __metadata("design:type", Users_1.Users)
], Summoner.prototype, "users", void 0);
Summoner = __decorate([
    typeorm_1.Entity()
], Summoner);
exports.Summoner = Summoner;
//# sourceMappingURL=Summoner.js.map