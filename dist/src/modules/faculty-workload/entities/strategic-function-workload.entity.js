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
exports.StrategicFunctionWorkload = void 0;
const typeorm_1 = require("typeorm");
let StrategicFunctionWorkload = class StrategicFunctionWorkload {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "userID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationUniversityLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "approvedUniversityDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "approvedUniversityDesignationFilenames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationCollegeCampusLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "approvedCollegeCampusDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "approvedCollegeCampusDesignationFilenames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationDepartmentLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "approvedDepartmentDesignationFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, array: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "approvedDepartmentDesignationFilenames", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademic1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademic2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademicFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademicFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademicFilePath1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademicFilename1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademicFilePath2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsSportTrainorAcademicFilename2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhoc1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhoc2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhocFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhocFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhocFilePath1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhocFilename1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhocFilePath2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "designationAsMemberOfAdhocFilename2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "academicAdvisees", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "academicAdviseesFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "academicAdviseesFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal' }),
    __metadata("design:type", Number)
], StrategicFunctionWorkload.prototype, "sfwPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StrategicFunctionWorkload.prototype, "currentProcessRole", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], StrategicFunctionWorkload.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], StrategicFunctionWorkload.prototype, "isSubmitted", void 0);
StrategicFunctionWorkload = __decorate([
    (0, typeorm_1.Entity)('strategic-function-workload'),
    (0, typeorm_1.Unique)('userId', ['userID'])
], StrategicFunctionWorkload);
exports.StrategicFunctionWorkload = StrategicFunctionWorkload;
//# sourceMappingURL=strategic-function-workload.entity.js.map