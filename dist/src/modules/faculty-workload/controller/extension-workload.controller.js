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
exports.ExtensionWorkloadController = void 0;
const common_1 = require("@nestjs/common");
const extension_workload_service_1 = require("../services/extension-workload.service");
let ExtensionWorkloadController = class ExtensionWorkloadController {
    constructor(extensionWorkloadService) {
        this.extensionWorkloadService = extensionWorkloadService;
    }
    async extension() {
        return 'extension-workload';
    }
    async saveExtensionWorkload(userId, extensionWorkload) {
        return this.extensionWorkloadService.saveExtensionWorkload(extensionWorkload, userId);
    }
    async getAllPendingExtensionWorkloadDC(userId) {
        return this.extensionWorkloadService.getAllPendingExtensionWorkloadDC(userId);
    }
    async getAllPendingExtensionWorkloadDean(userId) {
        return this.extensionWorkloadService.getAllPendingExtensionWorkloadDean(userId);
    }
    async getAllPendingExtensionWorkloadOVPAA() {
        return this.extensionWorkloadService.getAllPendingExtensionWorkloadOVPAA();
    }
    async approveWorkload(workloadId) {
        return this.extensionWorkloadService.approveWorkload(workloadId);
    }
    async ovpaaApproveWorkload(remarks) {
        return this.extensionWorkloadService.ovpaaApproveWorkload(remarks);
    }
    async getWorkloadRemarksFaculty(userId) {
        return this.extensionWorkloadService.getWorkloadRemarksFaculty(userId);
    }
    async getAllTotalWorkloadPointsApproved() {
        return this.extensionWorkloadService.getAllTotalWorkloadPointsApproved();
    }
    async getAllPendingWorkload(email) {
        return this.extensionWorkloadService.getAllPendingWorkload(email);
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        return this.extensionWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "extension", null);
__decorate([
    (0, common_1.Post)(':userId/save'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "saveExtensionWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-extension-workload-dc'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getAllPendingExtensionWorkloadDC", null);
__decorate([
    (0, common_1.Get)(':userId/all-pending-extension-workload-dean'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getAllPendingExtensionWorkloadDean", null);
__decorate([
    (0, common_1.Get)('all-pending-extension-workload-ovpaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getAllPendingExtensionWorkloadOVPAA", null);
__decorate([
    (0, common_1.Patch)(':workloadId/approve-workload'),
    __param(0, (0, common_1.Param)('workloadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "approveWorkload", null);
__decorate([
    (0, common_1.Patch)('ovpaa-approve-workload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "ovpaaApproveWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/workload-remarks'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getWorkloadRemarksFaculty", null);
__decorate([
    (0, common_1.Get)('workloads-approved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getAllTotalWorkloadPointsApproved", null);
__decorate([
    (0, common_1.Get)(':email/all-pending-workloads'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getAllPendingWorkload", null);
__decorate([
    (0, common_1.Get)(':userId/:currentProcessRole/all-pending-by-process-role'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('currentProcessRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExtensionWorkloadController.prototype, "getAllPendingWorkloadByIdAndCurrentProcessRole", null);
ExtensionWorkloadController = __decorate([
    (0, common_1.Controller)('/extension-workload'),
    __metadata("design:paramtypes", [extension_workload_service_1.ExtensionWorkloadService])
], ExtensionWorkloadController);
exports.ExtensionWorkloadController = ExtensionWorkloadController;
//# sourceMappingURL=extension-workload.controller.js.map