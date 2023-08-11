"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachingWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const user_entity_1 = require("../../user/entities/user.entity");
const teaching_workload_entity_1 = require("../entities/teaching-workload.entity");
const teachingWorkloadRepository = data_source_1.AppDataSource.getRepository(teaching_workload_entity_1.TeachingWorkload);
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
let TeachingWorkloadService = class TeachingWorkloadService {
    async saveTeachingWorkload(teachingWorkload, userId) {
        teachingWorkload.userID = userId;
        teachingWorkload.status = 'pending';
        teachingWorkload.currentProcessRole = 'Department Chairperson';
        return await teachingWorkloadRepository.save(teachingWorkload);
    }
    async getAllPendingTeachingWorkloadDC(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
        const pendingTeachingWorkloads = await teachingWorkloadRepository
            .createQueryBuilder('teaching-workload')
            .where('teaching-workload.status = :status', {
            status: 'pending',
        })
            .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Department Chairperson',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .andWhere('user.department = :department', {
                department: reviewee.department,
            })
                .getOne();
            if (user) {
                user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
                user.workloadId = pendingTeachingWorkloads[i].id;
                data.push(user);
            }
        }
        return data;
    }
    async getAllPendingTeachingWorkloadDean(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
        const pendingTeachingWorkloads = await teachingWorkloadRepository
            .createQueryBuilder('teaching-workload')
            .where('teaching-workload.status = :status', {
            status: 'pending',
        })
            .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Dean',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .getOne();
            if (user) {
                user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
                user.workloadId = pendingTeachingWorkloads[i].id;
                data.push(user);
            }
        }
        return data;
    }
    async getAllPendingTeachingWorkloadOVPAA() {
        const pendingTeachingWorkloads = await teachingWorkloadRepository
            .createQueryBuilder('teaching-workload')
            .where('teaching-workload.status = :status', {
            status: 'pending',
        })
            .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'OVPAA',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
                .getOne();
            if (user) {
                user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
                user.workloadId = pendingTeachingWorkloads[i].id;
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
        const workload = await teachingWorkloadRepository.findBy({
            id: workloadId,
        });
        if (workload[0].currentProcessRole === 'Department Chairperson') {
            workload[0].currentProcessRole = 'Dean';
        }
        else if (workload[0].currentProcessRole === 'Dean') {
            workload[0].currentProcessRole = 'OVPAA';
        }
        return await teachingWorkloadRepository.save(workload);
    }
    async ovpaaApproveWorkload(remarks) {
        const workload = await teachingWorkloadRepository.findBy({
            id: remarks.key,
        });
        workload[0].status = 'approved';
        workload[0].currentProcessRole = '';
        workload[0].remarks = remarks;
        return await teachingWorkloadRepository.save(workload);
    }
    async disapproveWorkload(workloadId) {
        const workload = await teachingWorkloadRepository.findBy({
            id: workloadId,
        });
        workload[0].status = 'disapproved';
        return await teachingWorkloadRepository.save(workload);
    }
    async getWorkloadRemarksFaculty(userId) {
        const workloadRemarks = await teachingWorkloadRepository
            .createQueryBuilder('teaching-workload')
            .where('teaching-workload.userID = :userId', {
            userId,
        })
            .getMany();
        const data = [];
        const user = await userRepository.findOneBy({
            id: userId,
        });
        for (let i = 0; workloadRemarks.length > i; i++) {
            user.twlFilePath = workloadRemarks[i].twlFilePath;
            user.workloadId = workloadRemarks[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingWorkload(email) {
        const user = await userRepository.findOneBy({ email: email });
        const teachingWorkload = await teachingWorkloadRepository.findBy({
            userID: user.id,
        });
        return teachingWorkload;
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        const teachingWorkload = await teachingWorkloadRepository.findBy({
            userID: userId,
            currentProcessRole: currentProcessRole,
        });
        return teachingWorkload;
    }
};
TeachingWorkloadService = __decorate([
    (0, common_1.Injectable)()
], TeachingWorkloadService);
exports.TeachingWorkloadService = TeachingWorkloadService;
//# sourceMappingURL=teaching-workload.service.js.map