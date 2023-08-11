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
const research_workload_entity_1 = require("../entities/research-workload.entity");
const strategic_function_workload_entity_1 = require("../entities/strategic-function-workload.entity");
const teaching_workload_entity_1 = require("../entities/teaching-workload.entity");
const extensionWorkloadRepository = data_source_1.AppDataSource.getRepository(extension_workload_entity_1.ExtensionWorkload);
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
const researchWorkloadRepository = data_source_1.AppDataSource.getRepository(research_workload_entity_1.ResearchWorkload);
const strategicWorkloadRepository = data_source_1.AppDataSource.getRepository(strategic_function_workload_entity_1.StrategicFunctionWorkload);
const teachingWorkloadRepository = data_source_1.AppDataSource.getRepository(teaching_workload_entity_1.TeachingWorkload);
let ExtensionWorkloadService = class ExtensionWorkloadService {
    async saveExtensionWorkload(extensionWorkload, userId) {
        extensionWorkload.userID = userId;
        extensionWorkload.status = 'pending';
        extensionWorkload.currentProcessRole = 'Department Chairperson';
        return await extensionWorkloadRepository.save(extensionWorkload);
    }
    async getAllPendingExtensionWorkloadDC(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
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
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .andWhere('user.department = :department', {
                department: reviewee.department,
            })
                .getOne();
            if (user) {
                user.extensionActivityFilePath =
                    pendingExtensionWorkloads[i].extensionActivityFilePath;
                user.certificateFilePath =
                    pendingExtensionWorkloads[i].certificateFilePath;
                user.summaryOfHoursFilePath =
                    pendingExtensionWorkloads[i].summaryOfHoursFilePath;
                user.workloadId = pendingExtensionWorkloads[i].id;
                data.push(user);
            }
        }
        return data;
    }
    async getAllPendingExtensionWorkloadDean(userId) {
        const reviewee = await userRepository.findOneBy({
            id: userId,
        });
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
                .andWhere('user.campus = :campus', {
                campus: reviewee.campus,
            })
                .getOne();
            if (user) {
                user.extensionActivityFilePath =
                    pendingExtensionWorkloads[i].extensionActivityFilePath;
                user.certificateFilePath =
                    pendingExtensionWorkloads[i].certificateFilePath;
                user.summaryOfHoursFilePath =
                    pendingExtensionWorkloads[i].summaryOfHoursFilePath;
                user.workloadId = pendingExtensionWorkloads[i].id;
                data.push(user);
            }
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
            if (user) {
                user.extensionActivityFilePath =
                    pendingExtensionWorkloads[i].extensionActivityFilePath;
                user.certificateFilePath =
                    pendingExtensionWorkloads[i].certificateFilePath;
                user.summaryOfHoursFilePath =
                    pendingExtensionWorkloads[i].summaryOfHoursFilePath;
                user.workloadId = pendingExtensionWorkloads[i].id;
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
        const workload = await extensionWorkloadRepository.findBy({
            id: workloadId,
        });
        if (workload[0].currentProcessRole === 'Department Chairperson') {
            workload[0].currentProcessRole = 'Dean';
        }
        else if (workload[0].currentProcessRole === 'Dean') {
            workload[0].currentProcessRole = 'OVPAA';
        }
        return await extensionWorkloadRepository.save(workload);
    }
    async ovpaaApproveWorkload(remarks) {
        const workload = await extensionWorkloadRepository.findOneBy({
            id: remarks.key,
        });
        workload.status = 'approved';
        workload.currentProcessRole = '';
        workload.remarks = remarks;
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
            user.extensionActivityFilePath =
                workloadRemarks[i].extensionActivityFilePath;
            user.certificateFilePath = workloadRemarks[i].certificateFilePath;
            user.summaryOfHoursFilePath = workloadRemarks[i].summaryOfHoursFilePath;
            user.workloadId = workloadRemarks[i].id;
            data.push(user);
        }
        return data;
    }
    async getAllTotalWorkloadPointsApproved() {
        const extensionWorkloads = await extensionWorkloadRepository.findBy({
            status: 'approved',
        });
        const researchWorkloads = await researchWorkloadRepository.findBy({
            status: 'approved',
        });
        const strategicWorkloads = await strategicWorkloadRepository.findBy({
            status: 'approved',
        });
        const teachingWorkloads = await teachingWorkloadRepository.findBy({
            status: 'approved',
        });
        const users = [];
        const filteredUsers = [];
        for (let i = 0; i < extensionWorkloads.length; i++) {
            const user = await userRepository.findOneBy({
                id: extensionWorkloads[i].userID,
            });
            users.push(user);
        }
        for (let i = 0; i < researchWorkloads.length; i++) {
            const user = await userRepository.findOneBy({
                id: researchWorkloads[i].userID,
            });
            users.push(user);
        }
        for (let i = 0; i < strategicWorkloads.length; i++) {
            const user = await userRepository.findOneBy({
                id: strategicWorkloads[i].userID,
            });
            users.push(user);
        }
        for (let i = 0; i < teachingWorkloads.length; i++) {
            const user = await userRepository.findOneBy({
                id: teachingWorkloads[i].userID,
            });
            users.push(user);
        }
        const filtered = users.filter((element) => {
            const isDuplicate = filteredUsers.includes(element.id);
            if (!isDuplicate) {
                filteredUsers.push(element.id);
                return true;
            }
            return false;
        });
        const setter = filtered;
        for (let b = 0; setter.length > b; b++) {
            for (let c = 0; teachingWorkloads.length > c; c++) {
                if (setter[b].id === teachingWorkloads[c].userID) {
                    setter[b].twlPoints = Number(teachingWorkloads[c].remarks.points);
                }
            }
            for (let d = 0; researchWorkloads.length > d; d++) {
                if (setter[b].id === researchWorkloads[d].userID) {
                    setter[b].rwlPoints = Number(researchWorkloads[d].remarks.points);
                }
            }
            for (let e = 0; setter.length > e; e++) {
                if (setter[b].id === extensionWorkloads[e].userID) {
                    setter[b].ewlPoints = Number(extensionWorkloads[e].remarks.points);
                }
            }
            for (let f = 0; setter.length > f; f++) {
                if (setter[b].id === strategicWorkloads[f].userID) {
                    setter[b].sfwPoints = Number(strategicWorkloads[f].remarks.points);
                }
            }
        }
        return setter;
    }
    async getAllPendingWorkload(email) {
        const user = await userRepository.findOneBy({ email: email });
        const extensionWorkload = await extensionWorkloadRepository.findBy({
            userID: user.id,
        });
        return extensionWorkload;
    }
    async getAllPendingWorkloadByIdAndCurrentProcessRole(userId, currentProcessRole) {
        const extensionWorkload = await extensionWorkloadRepository.findBy({
            userID: userId,
            currentProcessRole: currentProcessRole,
        });
        return extensionWorkload;
    }
};
ExtensionWorkloadService = __decorate([
    (0, common_1.Injectable)()
], ExtensionWorkloadService);
exports.ExtensionWorkloadService = ExtensionWorkloadService;
//# sourceMappingURL=extension-workload.service.js.map