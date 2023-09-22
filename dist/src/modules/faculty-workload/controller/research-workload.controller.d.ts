import { ResearchWorkloadService } from '../services/research-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';
export declare class ResearchWorkloadController {
    private readonly researchWorkloadService;
    constructor(researchWorkloadService: ResearchWorkloadService);
    research(): Promise<string>;
    saveResearchWorkload(userId: string, researchWorkload: any): Promise<ResearchWorkload>;
    getAllPendingResearchWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingResearchWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingResearchWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<ResearchWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<ResearchWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<ResearchWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<ResearchWorkload[]>;
    getSavedWorkload(userId: string): Promise<ResearchWorkload>;
    submitWorkload(id: string): Promise<ResearchWorkload>;
}
