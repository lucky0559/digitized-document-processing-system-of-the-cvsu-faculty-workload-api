"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategicFunctionWorkloadService = void 0;
const common_1 = require("@nestjs/common");
const data_source_1 = require("../../../data-source");
const user_entity_1 = require("../../user/entities/user.entity");
const strategic_function_workload_entity_1 = require("../entities/strategic-function-workload.entity");
const strategicFunctionWorkloadRepository = data_source_1.AppDataSource.getRepository(strategic_function_workload_entity_1.StrategicFunctionWorkload);
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
let StrategicFunctionWorkloadService = class StrategicFunctionWorkloadService {
    async saveStrategicFunctionWorkload(strategicFunctionWorkload, userId) {
        strategicFunctionWorkload.userID = userId;
        strategicFunctionWorkload.status = 'pending';
        strategicFunctionWorkload.currentProcessRole = 'Department Chairperson';
        return await strategicFunctionWorkloadRepository.upsert(strategicFunctionWorkload, ['userID']);
    }
    async getAllPendingStrategicWorkloadDC(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
        const pendingStrategicWorkloads = await strategicFunctionWorkloadRepository
            .createQueryBuilder('strategic-function-workload')
            .where('strategic-function-workload.status = :status', {
            status: 'pending',
        })
            .andWhere('strategic-function-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Department Chairperson',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .andWhere('user.department = :department', {
                department: reviewee.department,
            })
                .getOne();
            if (user) {
                user.approvedUniversityDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
                user.approvedCollegeCampusDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
                user.approvedDepartmentDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
                user.listOfAdviseesFilePath =
                    pendingStrategicWorkloads[i].academicAdviseesFilePath;
                user.workloadId = pendingStrategicWorkloads[i].id;
                data.push(user);
            }
        }
        return data;
    }
    async getAllPendingStrategicWorkloadDean(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
        const pendingStrategicWorkloads = await strategicFunctionWorkloadRepository
            .createQueryBuilder('strategic-function-workload')
            .where('strategic-function-workload.status = :status', {
            status: 'pending',
        })
            .andWhere('strategic-function-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'Dean',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .getOne();
            if (user) {
                user.approvedUniversityDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
                user.approvedCollegeCampusDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
                user.approvedDepartmentDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
                user.listOfAdviseesFilePath =
                    pendingStrategicWorkloads[i].academicAdviseesFilePath;
                user.workloadId = pendingStrategicWorkloads[i].id;
                data.push(user);
            }
        }
        return data;
    }
    async getAllPendingStrategicWorkloadOVPAA() {
        const pendingStrategicWorkloads = await strategicFunctionWorkloadRepository
            .createQueryBuilder('strategic-function-workload')
            .where('strategic-function-workload.status = :status', {
            status: 'pending',
        })
            .andWhere('strategic-function-workload.currentProcessRole = :currentProcessRole', {
            currentProcessRole: 'OVPAA',
        })
            .getMany();
        const data = [];
        for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
            const user = await userRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
                .getOne();
            if (user) {
                user.approvedUniversityDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
                user.approvedCollegeCampusDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
                user.approvedDepartmentDesignationFilePath =
                    pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
                user.listOfAdviseesFilePath =
                    pendingStrategicWorkloads[i].academicAdviseesFilePath;
                user.workloadId = pendingStrategicWorkloads[i].id;
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
        const workload = await strategicFunctionWorkloadRepository.findBy({
            id: workloadId,
        });
        if (workload[0].currentProcessRole === 'Department Chairperson') {
            workload[0].currentProcessRole = 'Dean';
        }
        else if (workload[0].currentProcessRole === 'Dean') {
            workload[0].currentProcessRole = 'OVPAA';
        }
        return await strategicFunctionWorkloadRepository.save(workload);
    }
    async ovpaaApproveWorkload(remarks) {
        const workload = await strategicFunctionWorkloadRepository.findOneBy({
            id: remarks.key,
        });
        workload.status = 'approved';
        workload.currentProcessRole = '';
        workload.remarks = remarks;
        return await strategicFunctionWorkloadRepository.save(workload);
    }
    async getWorkloadRemarksFaculty(userId) {
        const workloadRemarks = await strategicFunctionWorkloadRepository
            .createQueryBuilder('strategic-function-workload')
            .where('strategic-function-workload.status = :status', {
            status: 'remarks',
        })
            .andWhere('strategic-function-workload.userID = :userId', {
            userId,
        })
            .getMany();
        const data = [];
        const user = await userRepository.findOneBy({
            id: userId,
        });
        for (let i = 0; workloadRemarks.length > i; i++) {
            user.approvedUniversityDesignationFilePath =
                workloadRemarks[i].approvedUniversityDesignationFilePath;
            user.approvedCollegeCampusDesignationFilePath =
                workloadRemarks[i].approvedCollegeCampusDesignationFilePath;
            user.approvedDepartmentDesignationFilePath =
                workloadRemarks[i].approvedDepartmentDesignationFilePath;
            user.listOfAdviseesFilePath = workloadRemarks[i].academicAdviseesFilePath;
            user.workloadId = workloadRemarks[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllPendingWorkload(email) {
        const user = await userRepository.findOneBy({ email: email });
        const strategicWorkload = await strategicFunctionWorkloadRepository.findBy({
            userID: user.id,
        });
        return strategicWorkload;
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        const strategicFunctionWorkload = await strategicFunctionWorkloadRepository.findBy({
            userID: userId,
            currentProcessRole: currentProcessRole,
        });
        return strategicFunctionWorkload;
    }
    async getSavedWorkload(userId) {
        return await strategicFunctionWorkloadRepository.findOneBy({
            userID: userId,
            isSubmitted: false,
        });
    }
    async submitWorkload(id) {
        const workload = await strategicFunctionWorkloadRepository.findOneBy({
            id,
        });
        workload.isSubmitted = true;
        return await strategicFunctionWorkloadRepository.save(workload);
    }
};
StrategicFunctionWorkloadService = __decorate([
    (0, common_1.Injectable)()
], StrategicFunctionWorkloadService);
exports.StrategicFunctionWorkloadService = StrategicFunctionWorkloadService;
//# sourceMappingURL=strategic-function-workload.service.js.map