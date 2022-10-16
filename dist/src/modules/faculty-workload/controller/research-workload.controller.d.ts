import { ResearchWorkloadService } from '../services/research-workload.service';
export declare class ResearchWorkloadController {
    private readonly researchWorkloadService;
    constructor(researchWorkloadService: ResearchWorkloadService);
    research(): Promise<string>;
    saveResearchWorkload(userId: string, researchWorkload: any): Promise<import("../entities/research-workload.entity").ResearchWorkload>;
    getAllPendingResearchWorkloadDC(): Promise<any[]>;
    getAllPendingResearchWorkloadDean(): Promise<any[]>;
    getAllPendingResearchWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<import("../entities/research-workload.entity").ResearchWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<import("../entities/research-workload.entity").ResearchWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
