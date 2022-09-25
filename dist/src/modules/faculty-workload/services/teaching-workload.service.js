"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachingWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const teaching_workload_entity_1 = require("../entities/teaching-workload.entity");
const teachingWorkloadRepository = data_source_1.AppDataSource.getRepository(teaching_workload_entity_1.TeachingWorkload);
let TeachingWorkloadService = class TeachingWorkloadService {
    async saveTeachingWorkload(teachingWorkload, userId) {
        teachingWorkload.userID = userId;
        return await teachingWorkloadRepository.save(teachingWorkload);
    }
};
TeachingWorkloadService = __decorate([
    (0, common_1.Injectable)()
], TeachingWorkloadService);
exports.TeachingWorkloadService = TeachingWorkloadService;
//# sourceMappingURL=teaching-workload.service.js.map