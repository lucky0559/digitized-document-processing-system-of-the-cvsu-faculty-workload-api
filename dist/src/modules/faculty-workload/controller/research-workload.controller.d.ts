import { ResearchWorkloadService } from '../services/research-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class ResearchWorkloadController {
    private readonly researchWorkloadService;
    constructor(researchWorkloadService: ResearchWorkloadService);
    research(): Promise<string>;
    saveResearchWorkload(userId: string, researchWorkload: any): Promise<import("../entities/research-workload.entity").ResearchWorkload>;
    getAllPendingResearchWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingResearchWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingResearchWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<import("../entities/research-workload.entity").ResearchWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<import("../entities/research-workload.entity").ResearchWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<import("../entities/research-workload.entity").ResearchWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<import("../entities/research-workload.entity").ResearchWorkload[]>;
}
