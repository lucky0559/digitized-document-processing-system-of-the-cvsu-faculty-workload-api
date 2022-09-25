"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const research_workload_entity_1 = require("../entities/research-workload.entity");
const researchWorkloadRepository = data_source_1.AppDataSource.getRepository(research_workload_entity_1.ResearchWorkload);
let ResearchWorkloadService = class ResearchWorkloadService {
    async saveResearchWorkload(researchWorkload, userId) {
        researchWorkload.userID = userId;
        return await researchWorkloadRepository.save(researchWorkload);
    }
};
ResearchWorkloadService = __decorate([
    (0, common_1.Injectable)()
], ResearchWorkloadService);
exports.ResearchWorkloadService = ResearchWorkloadService;
//# sourceMappingURL=research-workload.service.js.map