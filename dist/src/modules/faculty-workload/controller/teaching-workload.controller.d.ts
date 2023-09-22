import { TeachingWorkloadService } from '../services/teaching-workload.service';
import { RemarksAndPoints, TeachingWorkload } from '../entities/teaching-workload.entity';
export declare class TeachingWorkloadController {
    private readonly teachingWorkloadService;
    constructor(teachingWorkloadService: TeachingWorkloadService);
    teach(): Promise<string>;
    saveTeachingWorkload(userId: string, teachingWorkload: any): Promise<TeachingWorkload>;
    getAllPendingTeachingWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingTeachingWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingTeachingWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<TeachingWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<TeachingWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<TeachingWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<TeachingWorkload[]>;
    getSavedWorkload(userId: string): Promise<TeachingWorkload>;
    submitWorkload(id: string): Promise<TeachingWorkload>;
}
