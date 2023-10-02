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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../services/config.service");
let ConfigController = class ConfigController {
    constructor(configService) {
        this.configService = configService;
    }
    async getConfig() {
        return this.configService.getAllConfig();
    }
    async getHourlyRate() {
        return this.configService.getHourlyRate();
    }
    async updateSemester(semester) {
        return this.configService.updateSemester(semester);
    }
    async updateSchoolYear(schoolYearStart, schoolYearEnd) {
        return this.configService.updateSchoolYear(schoolYearStart, schoolYearEnd);
    }
    async updateSubmissionRange(submissionDateStart, submissionDateEnd) {
        return this.configService.updateSubmissionRange(submissionDateStart, submissionDateEnd);
    }
    async updateHourlyRate(hourlyRate) {
        return this.configService.updateHourlyRate(hourlyRate);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)('hourly-rate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getHourlyRate", null);
__decorate([
    (0, common_1.Patch)(':semester/update/semester'),
    __param(0, (0, common_1.Param)('semester')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "updateSemester", null);
__decorate([
    (0, common_1.Patch)(':schoolYearStart/:schoolYearEnd/update/school-year'),
    __param(0, (0, common_1.Param)('schoolYearStart')),
    __param(1, (0, common_1.Param)('schoolYearEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "updateSchoolYear", null);
__decorate([
    (0, common_1.Patch)(':submissionDateStart/:submissionDateEnd/update/submission-range'),
    __param(0, (0, common_1.Param)('submissionDateStart')),
    __param(1, (0, common_1.Param)('submissionDateEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "updateSubmissionRange", null);
__decorate([
    (0, common_1.Patch)(':hourlyRate/update/hourly-rate'),
    __param(0, (0, common_1.Param)('hourlyRate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "updateHourlyRate", null);
ConfigController = __decorate([
    (0, common_1.Controller)('/config'),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], ConfigController);
exports.ConfigController = ConfigController;
//# sourceMappingURL=config.controller.js.map