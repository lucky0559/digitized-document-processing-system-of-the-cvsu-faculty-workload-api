"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyWorkloadModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const extension_workload_controller_1 = require("./controller/extension-workload.controller");
const research_workload_controller_1 = require("./controller/research-workload.controller");
const strategic_function_workload_controller_1 = require("./controller/strategic-function-workload.controller");
const teaching_workload_controller_1 = require("./controller/teaching-workload.controller");
const extension_workload_entity_1 = require("./entities/extension-workload.entity");
const research_workload_entity_1 = require("./entities/research-workload.entity");
const strategic_function_workload_entity_1 = require("./entities/strategic-function-workload.entity");
const teaching_workload_entity_1 = require("./entities/teaching-workload.entity");
const extension_workload_service_1 = require("./services/extension-workload.service");
const research_workload_service_1 = require("./services/research-workload.service");
const strategic_function_workload_service_1 = require("./services/strategic-function-workload.service");
const teaching_workload_service_1 = require("./services/teaching-workload.service");
let FacultyWorkloadModule = class FacultyWorkloadModule {
};
FacultyWorkloadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                teaching_workload_entity_1.TeachingWorkload,
                research_workload_entity_1.ResearchWorkload,
                extension_workload_entity_1.ExtensionWorkload,
                strategic_function_workload_entity_1.StrategicFunctionWorkload,
            ]),
        ],
        controllers: [
            teaching_workload_controller_1.TeachingWorkloadController,
            research_workload_controller_1.ResearchWorkloadController,
            extension_workload_controller_1.ExtensionWorkloadController,
            strategic_function_workload_controller_1.StrategicFunctionWorkloadController,
        ],
        providers: [
            teaching_workload_service_1.TeachingWorkloadService,
            research_workload_service_1.ResearchWorkloadService,
            extension_workload_service_1.ExtensionWorkloadService,
            strategic_function_workload_service_1.StrategicFunctionWorkloadService,
        ],
        exports: [],
    })
], FacultyWorkloadModule);
exports.FacultyWorkloadModule = FacultyWorkloadModule;
//# sourceMappingURL=faculty-workload.module.js.map