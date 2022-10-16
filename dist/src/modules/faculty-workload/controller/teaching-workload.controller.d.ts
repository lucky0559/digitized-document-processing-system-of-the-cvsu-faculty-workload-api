import { TeachingWorkloadService } from '../services/teaching-workload.service';
export declare class TeachingWorkloadController {
    private readonly teachingWorkloadService;
    constructor(teachingWorkloadService: TeachingWorkloadService);
    teach(): Promise<string>;
    saveTeachingWorkload(userId: string, teachingWorkload: any): Promise<import("../entities/teaching-workload.entity").TeachingWorkload>;
    getAllPendingTeachingWorkloadDC(): Promise<any[]>;
    getAllPendingTeachingWorkloadDean(): Promise<any[]>;
    getAllPendingTeachingWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<import("../entities/teaching-workload.entity").TeachingWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<import("../entities/teaching-workload.entity").TeachingWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
