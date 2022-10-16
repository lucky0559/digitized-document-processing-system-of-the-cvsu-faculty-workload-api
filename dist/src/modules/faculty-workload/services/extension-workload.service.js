"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const user_entity_1 = require("../../user/entities/user.entity");
const extension_workload_entity_1 = require("../entities/extension-workload.entity");
const extensionWorkloadRepository = data_source_1.AppDataSource.getRepository(extension_workload_entity_1.ExtensionWorkload);
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
let ExtensionWorkloadService = class ExtensionWorkloadService {
    async saveExtensionWorkload(extensionWorkload, userId) {
        extensionWorkload.userID = userId;
        extensionWorkload.status = 'pending';
        return await extensionWorkloadRepository.save(extensionWorkload);
    }
    async getAllPendingExtensionWorkloadDC() {
        const pendingExtensionWorkloads = await extensionWorkloadRepository
            .createQueryBuilder('extension-workload')
            .where('extension-workload.status = :status', { status: 'pending' })
            .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Department Chairperson',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
                .getOne();
            user.extensionActivityFilePath =
                pendingExtensionWorkloads[i].extensionActivityFilePath;
            user.certificateFilePath =
                pendingExtensionWorkloads[i].certificateFilePath;
            user.summaryOfHoursFilePath =
                pendingExtensionWorkloads[i].summaryOfHoursFilePath;
            user.workloadId = pendingExtensionWorkloads[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingExtensionWorkloadDean() {
        const pendingExtensionWorkloads = await extensionWorkloadRepository
            .createQueryBuilder('extension-workload')
            .where('extension-workload.status = :status', { status: 'pending' })
            .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Dean',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
                .getOne();
            user.extensionActivityFilePath =
                pendingExtensionWorkloads[i].extensionActivityFilePath;
            user.certificateFilePath =
                pendingExtensionWorkloads[i].certificateFilePath;
            user.summaryOfHoursFilePath =
                pendingExtensionWorkloads[i].summaryOfHoursFilePath;
            user.workloadId = pendingExtensionWorkloads[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingExtensionWorkloadOVPAA() {
        const pendingExtensionWorkloads = await extensionWorkloadRepository
            .createQueryBuilder('extension-workload')
            .where('extension-workload.status = :status', { status: 'pending' })
            .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'OVPAA',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
                .getOne();
            user.extensionActivityFilePath =
                pendingExtensionWorkloads[i].extensionActivityFilePath;
            user.certificateFilePath =
                pendingExtensionWorkloads[i].certificateFilePath;
            user.summaryOfHoursFilePath =
                pendingExtensionWorkloads[i].summaryOfHoursFilePath;
            user.workloadId = pendingExtensionWorkloads[i].id;
            data.push(user);
        }
        return data;
    }
    async approveWorkload(workloadId) {
        const workload = await extensionWorkloadRepository.findBy({
            id: workloadId,
        });
        if (workload[0].currentProcessRole === 'Department Chairperson') {
            workload[0].currentProcessRole = 'Dean';
        }
        else if (workload[0].currentProcessRole === 'Dean') {
            workload[0].currentProcessRole = 'OVPAA';
        }
        else if (workload[0].currentProcessRole === 'OVPAA') {
            workload[0].status = 'approved';
            workload[0].currentProcessRole = '';
        }
        workload[0].remarks = '';
        return await extensionWorkloadRepository.save(workload);
    }
    async remarksWorkload(workloadId, remarks) {
        const workload = await extensionWorkloadRepository.findBy({
            id: workloadId,
        });
        workload[0].remarks = remarks;
        workload[0].status = 'remarks';
        return await extensionWorkloadRepository.save(workload);
    }
    async getWorkloadRemarksFaculty(userId) {
        const workloadRemarks = await extensionWorkloadRepository
            .createQueryBuilder('extension-workload')
            .where('extension-workload.status = :status', { status: 'remarks' })
            .andWhere('extension-workload.userID = :userId', {
            userId,
        })
            .getMany();
        const data = [];
        const user = await userRepository.findOneBy({
            id: userId,
        });
        for (let i = 0; workloadRemarks.length > i; i++) {
            user.remarks = workloadRemarks[i].remarks;
            user.extensionActivityFilePath =
                workloadRemarks[i].extensionActivityFilePath;
            user.certificateFilePath = workloadRemarks[i].certificateFilePath;
            user.summaryOfHoursFilePath = workloadRemarks[i].summaryOfHoursFilePath;
            user.workloadId = workloadRemarks[i].id;
            data.push(user);
        }
        return data;
    }
};
ExtensionWorkloadService = __decorate([
    (0, common_1.Injectable)()
], ExtensionWorkloadService);
exports.ExtensionWorkloadService = ExtensionWorkloadService;
//# sourceMappingURL=extension-workload.service.js.map