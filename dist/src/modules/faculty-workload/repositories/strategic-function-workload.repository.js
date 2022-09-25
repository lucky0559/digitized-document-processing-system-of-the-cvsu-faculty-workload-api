"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategicFunctionWorkloadRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_ex_decorator_1 = require("../../../database/typeorm-ex.decorator");
const strategic_function_workload_entity_1 = require("../entities/strategic-function-workload.entity");
let StrategicFunctionWorkloadRepository = class StrategicFunctionWorkloadRepository extends typeorm_1.Repository {
};
StrategicFunctionWorkloadRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(strategic_function_workload_entity_1.StrategicFunctionWorkload)
], StrategicFunctionWorkloadRepository);
exports.StrategicFunctionWorkloadRepository = StrategicFunctionWorkloadRepository;
//# sourceMappingURL=strategic-function-workload.repository.js.map