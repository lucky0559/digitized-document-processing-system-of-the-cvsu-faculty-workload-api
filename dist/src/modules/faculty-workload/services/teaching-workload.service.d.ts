import { TeachingWorkload } from '../entities/teaching-workload.entity';
export declare class TeachingWorkloadService {
    saveTeachingWorkload(teachingWorkload: TeachingWorkload, userId: string): Promise<TeachingWorkload>;
    getAllPendingTeachingWorkloadDC(): Promise<any[]>;
    getAllPendingTeachingWorkloadDean(): Promise<any[]>;
    getAllPendingTeachingWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<TeachingWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<TeachingWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
