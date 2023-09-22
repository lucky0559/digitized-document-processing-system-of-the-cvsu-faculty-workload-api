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
exports.ResearchWorkload = void 0;
const typeorm_1 = require("typeorm");
let ResearchWorkload = class ResearchWorkload {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "userID", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ResearchWorkload.prototype, "cvsuFunded", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ResearchWorkload.prototype, "externallyFunded", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "cvsuFundedFilenames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "cvsuFundedFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "externallyFundedFilenames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "externallyFundedFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "disseminatedResearch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "disseminatedResearchFilesPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ResearchWorkload.prototype, "rwlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "currentProcessRole", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ResearchWorkload.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ResearchWorkload.prototype, "isSubmitted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ResearchWorkload.prototype, "disseminatedResearchFilenames", void 0);
ResearchWorkload = __decorate([
    (0, typeorm_1.Entity)('research-workload')
], ResearchWorkload);
exports.ResearchWorkload = ResearchWorkload;
//# sourceMappingURL=research-workload.entity.js.map