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
exports.StrategicFunctionWorkloadController = void 0;
const common_1 = require("@nestjs/common");
const strategic_function_workload_service_1 = require("../services/strategic-function-workload.service");
let StrategicFunctionWorkloadController = class StrategicFunctionWorkloadController {
    constructor(strategicFunctionWorkloadService) {
        this.strategicFunctionWorkloadService = strategicFunctionWorkloadService;
    }
    async strategicFunction() {
        return 'strategic-function-workload';
    }
    async saveTeachingWorkload(userId, strategicFunctionWorkload) {
        return this.strategicFunctionWorkloadService.saveStrategicFunctinWorkload(strategicFunctionWorkload, userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "strategicFunction", null);
__decorate([
    (0, common_1.Post)(':userId/save'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "saveTeachingWorkload", null);
StrategicFunctionWorkloadController = __decorate([
    (0, common_1.Controller)('/strategic-function-workload'),
    __metadata("design:paramtypes", [strategic_function_workload_service_1.StrategicFunctionWorkloadService])
], StrategicFunctionWorkloadController);
exports.StrategicFunctionWorkloadController = StrategicFunctionWorkloadController;
//# sourceMappingURL=strategic-function-workload.controller.js.map