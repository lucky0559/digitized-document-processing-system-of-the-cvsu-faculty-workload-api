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
exports.ResearchWorkloadController = void 0;
const common_1 = require("@nestjs/common");
const research_workload_service_1 = require("../services/research-workload.service");
let ResearchWorkloadController = class ResearchWorkloadController {
    constructor(researchWorkloadService) {
        this.researchWorkloadService = researchWorkloadService;
    }
    async research() {
        return 'research-workload';
    }
    async saveResearchWorkload(userId, researchWorkload) {
        return this.researchWorkloadService.saveResearchWorkload(researchWorkload, userId);
    }
    async getAllPendingResearchWorkloadDC(userId) {
        return this.researchWorkloadService.getAllPendingResearchWorkloadDC(userId);
    }
    async getAllPendingResearchWorkloadDean(userId) {
        return this.researchWorkloadService.getAllPendingResearchWorkloadDean(userId);
    }
    async getAllPendingResearchWorkloadOVPAA() {
        return this.researchWorkloadService.getAllPendingResearchWorkloadOVPAA();
    }
    async approveWorkload(workloadId) {
        return this.researchWorkloadService.approveWorkload(workloadId);
    }
    async ovpaaApproveWorkload(remarks) {
        return this.researchWorkloadService.ovpaaApproveWorkload(remarks);
    }
    async getWorkloadRemarksFaculty(userId) {
        return this.researchWorkloadService.getWorkloadRemarksFaculty(userId);
    }
    async getAllPendingWorkload(email) {
        return this.researchWorkloadService.getAllPendingWorkload(email);
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        return this.researchWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "research", null);
__decorate([
    (0, common_1.Post)(':userId/save'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "saveResearchWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-research-workload-dc'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "getAllPendingResearchWorkloadDC", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-research-workload-dean'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "getAllPendingResearchWorkloadDean", null);
__decorate([
    (0, common_1.Get)('all-pending-research-workload-ovpaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "getAllPendingResearchWorkloadOVPAA", null);
__decorate([
    (0, common_1.Patch)(':workloadId/approve-workload'),
    __param(0, (0, common_1.Param)('workloadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "approveWorkload", null);
__decorate([
    (0, common_1.Patch)('ovpaa-approve-workload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "ovpaaApproveWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/workload-remarks'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "getWorkloadRemarksFaculty", null);
__decorate([
    (0, common_1.Get)(':email/all-pending-workloads'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "getAllPendingWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/:currentProcessRole/all-pending-by-process-role'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('currentProcessRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ResearchWorkloadController.prototype, "getAllPendingWorkloadByIdAndCurrentProcessRole", null);
ResearchWorkloadController = __decorate([
    (0, common_1.Controller)('/research-workload'),
    __metadata("design:paramtypes", [research_workload_service_1.ResearchWorkloadService])
], ResearchWorkloadController);
exports.ResearchWorkloadController = ResearchWorkloadController;
//# sourceMappingURL=research-workload.controller.js.map