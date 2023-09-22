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
    async saveStrategicFunctinWorkload(userId, strategicFunctionWorkload) {
        return this.strategicFunctionWorkloadService.saveStrategicFunctionWorkload(strategicFunctionWorkload, userId);
    }
    async getAllPendingStrategicWorkloadDC(userId) {
        return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadDC(userId);
    }
    async getAllPendingStrategicWorkloadDean(userId) {
        return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadDean(userId);
    }
    async getAllPendingStrategicWorkloadOVPAA() {
        return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadOVPAA();
    }
    async approveWorkload(workloadId) {
        return this.strategicFunctionWorkloadService.approveWorkload(workloadId);
    }
    async ovpaaApproveWorkload(remarks) {
        return this.strategicFunctionWorkloadService.ovpaaApproveWorkload(remarks);
    }
    async getWorkloadRemarksFaculty(userId) {
        return this.strategicFunctionWorkloadService.getWorkloadRemarksFaculty(userId);
    }
    async getAllPendingWorkload(email) {
        return this.strategicFunctionWorkloadService.getAllPendingWorkload(email);
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        return this.strategicFunctionWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole);
    }
    async getSavedWorkload(userId) {
        return this.strategicFunctionWorkloadService.getSavedWorkload(userId);
    }
    async submitWorkload(id) {
        return this.strategicFunctionWorkloadService.submitWorkload(id);
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
], StrategicFunctionWorkloadController.prototype, "saveStrategicFunctinWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-strategic-workload-dc'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getAllPendingStrategicWorkloadDC", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-strategic-workload-dean'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getAllPendingStrategicWorkloadDean", null);
__decorate([
    (0, common_1.Get)('all-pending-strategic-workload-ovpaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getAllPendingStrategicWorkloadOVPAA", null);
__decorate([
    (0, common_1.Patch)(':workloadId/approve-workload'),
    __param(0, (0, common_1.Param)('workloadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "approveWorkload", null);
__decorate([
    (0, common_1.Patch)('ovpaa-approve-workload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "ovpaaApproveWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/workload-remarks'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getWorkloadRemarksFaculty", null);
__decorate([
    (0, common_1.Get)(':email/all-pending-workloads'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getAllPendingWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/:currentProcessRole/all-pending-by-process-role'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('currentProcessRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getAllPendingWorkloadByIdAndCurrentProcessRole", null);
__decorate([
    (0, common_1.Get)(':userId/getSavedWorkload'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "getSavedWorkload", null);
__decorate([
    (0, common_1.Patch)(':id/submit-workload'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrategicFunctionWorkloadController.prototype, "submitWorkload", null);
StrategicFunctionWorkloadController = __decorate([
    (0, common_1.Controller)('/strategic-function-workload'),
    __metadata("design:paramtypes", [strategic_function_workload_service_1.StrategicFunctionWorkloadService])
], StrategicFunctionWorkloadController);
exports.StrategicFunctionWorkloadController = StrategicFunctionWorkloadController;
//# sourceMappingURL=strategic-function-workload.controller.js.map