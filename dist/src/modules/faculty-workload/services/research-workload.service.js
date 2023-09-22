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
        researchWorkload.currentProcessRole = 'Department Chairperson';
        return await researchWorkloadRepository.save(researchWorkload);
    }
    async getAllPendingResearchWorkloadDC(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
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
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .andWhere('user.department = :department', {
                department: reviewee.department,
            })
                .getOne();
            if (user) {
                user.cvsuFunded = pendingResearchWorkloads[i].cvsuFunded;
                user.externallyFunded = pendingResearchWorkloads[i].externallyFunded;
                user.disseminatedResearchFilesPath =
                    pendingResearchWorkloads[i].disseminatedResearchFilesPath;
                user.workloadId = pendingResearchWorkloads[i].id;
                data.push(user);
            }
        }
        return data;
    }
    async getAllPendingResearchWorkloadDean(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
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
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .getOne();
            if (user) {
                user.cvsuFunded = pendingResearchWorkloads[i].cvsuFunded;
                user.externallyFunded = pendingResearchWorkloads[i].externallyFunded;
                user.disseminatedResearchFilesPath =
                    pendingResearchWorkloads[i].disseminatedResearchFilesPath;
                user.workloadId = pendingResearchWorkloads[i].id;
                data.push(user);
            }
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
            if (user) {
                user.cvsuFunded = pendingResearchWorkloads[i].cvsuFunded;
                user.externallyFunded = pendingResearchWorkloads[i].externallyFunded;
                user.disseminatedResearchFilesPath =
                    pendingResearchWorkloads[i].disseminatedResearchFilesPath;
                user.workloadId = pendingResearchWorkloads[i].id;
                data.push(user);
            }
        }
        return data.reduce((group, workload) => {
            var _a;
            const { campus } = workload;
            group[campus] = (_a = group[campus]) !== null && _a !== void 0 ? _a : [];
            group[campus].push(workload);
            return group;
        }, {});
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
        return await researchWorkloadRepository.save(workload);
    }
    async ovpaaApproveWorkload(remarks) {
        const workload = await researchWorkloadRepository.findOneBy({
            id: remarks.key,
        });
        workload.status = 'approved';
        workload.currentProcessRole = '';
        workload.remarks = remarks;
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
            user.cvsuFunded = workloadRemarks[i].cvsuFunded;
            user.externallyFunded = workloadRemarks[i].externallyFunded;
            user.disseminatedResearchFilesPath =
                workloadRemarks[i].disseminatedResearchFilesPath;
            user.workloadId = workloadRemarks[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingWorkload(email) {
        const user = await userRepository.findOneBy({ email: email });
        const researchWorkload = await researchWorkloadRepository.findBy({
            userID: user.id,
        });
        return researchWorkload;
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        const researchWorkload = await researchWorkloadRepository.findBy({
            userID: userId,
            currentProcessRole: currentProcessRole,
        });
        return researchWorkload;
    }
    async getSavedWorkload(userId) {
        return await researchWorkloadRepository.findOneBy({
            userID: userId,
            isSubmitted: false,
        });
    }
    async submitWorkload(id) {
        const workload = await researchWorkloadRepository.findOneBy({ id });
        workload.isSubmitted = true;
        return await researchWorkloadRepository.save(workload);
    }
};
ResearchWorkloadService = __decorate([
    (0, common_1.Injectable)()
], ResearchWorkloadService);
exports.ResearchWorkloadService = ResearchWorkloadService;
//# sourceMappingURL=research-workload.service.js.map