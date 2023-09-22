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
exports.TeachingWorkloadController = void 0;
const common_1 = require("@nestjs/common");
const teaching_workload_service_1 = require("../services/teaching-workload.service");
let TeachingWorkloadController = class TeachingWorkloadController {
    constructor(teachingWorkloadService) {
        this.teachingWorkloadService = teachingWorkloadService;
    }
    async teach() {
        return 'teaching-workload';
    }
    async saveTeachingWorkload(userId, teachingWorkload) {
        return this.teachingWorkloadService.saveTeachingWorkload(teachingWorkload, userId);
    }
    async getAllPendingTeachingWorkloadDC(userId) {
        return this.teachingWorkloadService.getAllPendingTeachingWorkloadDC(userId);
    }
    async getAllPendingTeachingWorkloadDean(userId) {
        return this.teachingWorkloadService.getAllPendingTeachingWorkloadDean(userId);
    }
    async getAllPendingTeachingWorkloadOVPAA() {
        return this.teachingWorkloadService.getAllPendingTeachingWorkloadOVPAA();
    }
    async approveWorkload(workloadId) {
        return this.teachingWorkloadService.approveWorkload(workloadId);
    }
    async ovpaaApproveWorkload(remarks) {
        return this.teachingWorkloadService.ovpaaApproveWorkload(remarks);
    }
    async getWorkloadRemarksFaculty(userId) {
        return this.teachingWorkloadService.getWorkloadRemarksFaculty(userId);
    }
    async getAllPendingWorkload(email) {
        return this.teachingWorkloadService.getAllPendingWorkload(email);
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        return this.teachingWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole);
    }
    async getSavedWorkload(userId) {
        return this.teachingWorkloadService.getSavedWorkload(userId);
    }
    async submitWorkload(id) {
        return this.teachingWorkloadService.submitWorkload(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "teach", null);
__decorate([
    (0, common_1.Post)(':userId/save'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "saveTeachingWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-teaching-workload-dc'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getAllPendingTeachingWorkloadDC", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-teaching-workload-dean'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getAllPendingTeachingWorkloadDean", null);
__decorate([
    (0, common_1.Get)('all-pending-teaching-workload-ovpaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getAllPendingTeachingWorkloadOVPAA", null);
__decorate([
    (0, common_1.Patch)(':workloadId/approve-workload'),
    __param(0, (0, common_1.Param)('workloadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "approveWorkload", null);
__decorate([
    (0, common_1.Patch)('ovpaa-approve-workload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "ovpaaApproveWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/workload-remarks'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getWorkloadRemarksFaculty", null);
__decorate([
    (0, common_1.Get)(':email/all-pending-workloads'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getAllPendingWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/:currentProcessRole/all-pending-by-process-role'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('currentProcessRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getAllPendingWorkloadByIdAndCurrentProcessRole", null);
__decorate([
    (0, common_1.Get)(':userId/getSavedWorkload'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "getSavedWorkload", null);
__decorate([
    (0, common_1.Patch)(':id/submit-workload'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingWorkloadController.prototype, "submitWorkload", null);
TeachingWorkloadController = __decorate([
    (0, common_1.Controller)('/teaching-workload'),
    __metadata("design:paramtypes", [teaching_workload_service_1.TeachingWorkloadService])
], TeachingWorkloadController);
exports.TeachingWorkloadController = TeachingWorkloadController;
//# sourceMappingURL=teaching-workload.controller.js.map