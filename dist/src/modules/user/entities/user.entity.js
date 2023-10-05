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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "workloadId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "middleInitial", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "emailToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "academicRank", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "twlFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, array: true }),
    __metadata("design:type", Object)
], User.prototype, "cvsuFunded", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, array: true }),
    __metadata("design:type", Object)
], User.prototype, "externallyFunded", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], User.prototype, "disseminatedResearchFilesPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "extensionActivityFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "certificateFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "summaryOfHoursFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "approvedUniversityDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "approvedCollegeCampusDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "approvedDepartmentDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "coachAdviserCertificateFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "approvedDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "listOfAdviseesFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "ewlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "rwlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "sfwPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "twlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "passwordResetCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "initialTwlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "initialRwlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "initialEwlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], User.prototype, "initialSfwPoints", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map