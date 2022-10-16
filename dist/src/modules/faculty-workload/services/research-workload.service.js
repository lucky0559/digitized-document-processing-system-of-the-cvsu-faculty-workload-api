"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const user_entity_1 = require("../../user/entities/user.entity");
const research_workload_entity_1 = require("../entities/research-workload.entity");
const researchWorkloadRepository = data_source_1.AppDataSource.getRepository(research_workload_entity_1.ResearchWorkload);
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
let ResearchWorkloadService = class ResearchWorkloadService {
    async saveResearchWorkload(researchWorkload, userId) {
        researchWorkload.userID = userId;
        researchWorkload.status = 'pending';
        return await researchWorkloadRepository.save(researchWorkload);
    }
    async getAllPendingResearchWorkloadDC() {
        const pendingResearchWorkloads = await researchWorkloadRepository
            .createQueryBuilder('research-workload')
            .where('research-workload.status = :status', { status: 'pending' })
            .andWhere('research-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Department Chairperson',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingResearchWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
                .getOne();
            user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
            user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
            user.rwlFilePath2 = pendingResearchWorkloads[i].rwlFilePath2;
            user.workloadId = pendingResearchWorkloads[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingResearchWorkloadDean() {
        const pendingResearchWorkloads = await researchWorkloadRepository
            .createQueryBuilder('research-workload')
            .where('research-workload.status = :status', { status: 'pending' })
            .andWhere('research-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Dean',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingResearchWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
                .getOne();
            user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
            user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
            user.rwlFilePath2 = pendingResearchWorkloads[i].rwlFilePath2;
            user.workloadId = pendingResearchWorkloads[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingResearchWorkloadOVPAA() {
        const pendingResearchWorkloads = await researchWorkloadRepository
            .createQueryBuilder('research-workload')
            .where('research-workload.status = :status', { status: 'pending' })
            .andWhere('research-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'OVPAA',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingResearchWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
                .getOne();
            user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
            user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
            user.rwlFilePath2 = pendingResearchWorkloads[i].rwlFilePath2;
            user.workloadId = pendingResearchWorkloads[i].id;
            data.push(user);
        }
        return data;
    }
    async approveWorkload(workloadId) {
        const workload = await researchWorkloadRepository.findBy({
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
        return await researchWorkloadRepository.save(workload);
    }
    async remarksWorkload(workloadId, remarks) {
        const workload = await researchWorkloadRepository.findBy({
            id: workloadId,
        });
        workload[0].remarks = remarks;
        workload[0].status = 'remarks';
        return await researchWorkloadRepository.save(workload);
    }
    async getWorkloadRemarksFaculty(userId) {
        const workloadRemarks = await researchWorkloadRepository
            .createQueryBuilder('research-workload')
            .where('research-workload.status = :status', { status: 'remarks' })
            .andWhere('research-workload.userID = :userId', {
            userId,
        })
            .getMany();
        const data = [];
        const user = await userRepository.findOneBy({
            id: userId,
        });
        for (let i = 0; workloadRemarks.length > i; i++) {
            user.remarks = workloadRemarks[i].remarks;
            user.rwlFilePath = workloadRemarks[i].rwlFilePath;
            user.rwlFilePath1 = workloadRemarks[i].rwlFilePath1;
            user.rwlFilePath2 = workloadRemarks[i].rwlFilePath2;
            user.workloadId = workloadRemarks[i].id;
            data.push(user);
        }
        return data;
    }
};
ResearchWorkloadService = __decorate([
    (0, common_1.Injectable)()
], ResearchWorkloadService);
exports.ResearchWorkloadService = ResearchWorkloadService;
//# sourceMappingURL=research-workload.service.js.map