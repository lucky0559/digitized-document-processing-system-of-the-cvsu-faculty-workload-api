import { RemarksAndPoints, TeachingWorkload } from '../entities/teaching-workload.entity';
export declare class TeachingWorkloadService {
    saveTeachingWorkload(teachingWorkload: TeachingWorkload, userId: string): Promise<TeachingWorkload>;
    getAllPendingTeachingWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingTeachingWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingTeachingWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<TeachingWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<TeachingWorkload[]>;
    disapproveWorkload(workloadId: string): Promise<TeachingWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<TeachingWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<TeachingWorkload[]>;
}
