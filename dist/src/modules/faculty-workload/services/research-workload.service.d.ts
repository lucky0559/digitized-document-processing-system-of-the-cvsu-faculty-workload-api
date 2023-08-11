import { ResearchWorkload } from '../entities/research-workload.entity';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class ResearchWorkloadService {
    saveResearchWorkload(researchWorkload: ResearchWorkload, userId: string): Promise<ResearchWorkload>;
    getAllPendingResearchWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingResearchWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingResearchWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<ResearchWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<ResearchWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<ResearchWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<ResearchWorkload[]>;
}
