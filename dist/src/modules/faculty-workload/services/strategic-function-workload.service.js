"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategicFunctionWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const strategic_function_workload_entity_1 = require("../entities/strategic-function-workload.entity");
const strategicFunctionWorkloadRepository = data_source_1.AppDataSource.getRepository(strategic_function_workload_entity_1.StrategicFunctionWorkload);
let StrategicFunctionWorkloadService = class StrategicFunctionWorkloadService {
    async saveStrategicFunctinWorkload(strategicFunctionWorkload, userId) {
        strategicFunctionWorkload.userID = userId;
        return await strategicFunctionWorkloadRepository.save(strategicFunctionWorkload);
    }
};
StrategicFunctionWorkloadService = __decorate([
    (0, common_1.Injectable)()
], StrategicFunctionWorkloadService);
exports.StrategicFunctionWorkloadService = StrategicFunctionWorkloadService;
//# sourceMappingURL=strategic-function-workload.service.js.map