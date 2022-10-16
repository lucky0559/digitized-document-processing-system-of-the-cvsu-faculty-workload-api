import { ResearchWorkload } from '../entities/research-workload.entity';
export declare class ResearchWorkloadService {
    saveResearchWorkload(researchWorkload: ResearchWorkload, userId: string): Promise<ResearchWorkload>;
    getAllPendingResearchWorkloadDC(): Promise<any[]>;
    getAllPendingResearchWorkloadDean(): Promise<any[]>;
    getAllPendingResearchWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<ResearchWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<ResearchWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
