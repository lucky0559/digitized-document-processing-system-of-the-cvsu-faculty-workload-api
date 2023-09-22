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
exports.ExtensionWorkload = void 0;
const typeorm_1 = require("typeorm");
let ExtensionWorkload = class ExtensionWorkload {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "userID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "designationExtensionActivity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "extensionActivityFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "extensionActivityFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "resourcePerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "certificateFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "certificateFilenames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "totalNumberHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "summaryOfHoursFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "summaryOfHoursFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], ExtensionWorkload.prototype, "ewlPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExtensionWorkload.prototype, "currentProcessRole", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ExtensionWorkload.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ExtensionWorkload.prototype, "isSubmitted", void 0);
ExtensionWorkload = __decorate([
    (0, typeorm_1.Entity)('extension-workload')
], ExtensionWorkload);
exports.ExtensionWorkload = ExtensionWorkload;
//# sourceMappingURL=extension-workload.entity.js.map