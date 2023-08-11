import { TeachingWorkloadService } from '../services/teaching-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class TeachingWorkloadController {
    private readonly teachingWorkloadService;
    constructor(teachingWorkloadService: TeachingWorkloadService);
    teach(): Promise<string>;
    saveTeachingWorkload(userId: string, teachingWorkload: any): Promise<import("../entities/teaching-workload.entity").TeachingWorkload>;
    getAllPendingTeachingWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingTeachingWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingTeachingWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<import("../entities/teaching-workload.entity").TeachingWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<import("../entities/teaching-workload.entity").TeachingWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<import("../entities/teaching-workload.entity").TeachingWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<import("../entities/teaching-workload.entity").TeachingWorkload[]>;
}
