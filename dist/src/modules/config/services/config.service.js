"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const config_entity_1 = require("../entities/config.entity");
const configRepository = data_source_1.AppDataSource.getRepository(config_entity_1.Config);
let ConfigService = class ConfigService {
    async getAllConfig() {
        const config = await configRepository.find();
        return config[0];
    }
    async getHourlyRate() {
        const config = await configRepository.find();
        return config[0].hourlyRate;
    }
    async updateSemester(semester) {
        const config = await configRepository.find();
        return configRepository.update(config[0].id, {
            semester,
        });
    }
    async updateSchoolYear(schoolYearStart, schoolYearEnd) {
        const config = await configRepository.find();
        return configRepository.update(config[0].id, {
            schoolYearStart,
            schoolYearEnd,
        });
    }
    async updateSubmissionRange(submissionDateStart, submissionDateEnd) {
        const config = await configRepository.find();
        return configRepository.update(config[0].id, {
            submissionDateStart: new Date(submissionDateStart).toISOString(),
            submissionDateEnd: new Date(submissionDateEnd).toISOString(),
        });
    }
    async updateHourlyRate(hourlyRate) {
        const config = await configRepository.find();
        return configRepository.update(config[0].id, {
            hourlyRate,
        });
    }
};
ConfigService = __decorate([
    (0, common_1.Injectable)()
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map