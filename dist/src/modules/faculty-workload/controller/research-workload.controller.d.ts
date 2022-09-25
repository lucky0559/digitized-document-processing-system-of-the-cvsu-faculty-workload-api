import { ResearchWorkloadService } from '../services/research-workload.service';
export declare class ResearchWorkloadController {
    private readonly researchWorkloadService;
    constructor(researchWorkloadService: ResearchWorkloadService);
    research(): Promise<string>;
    saveResearchWorkload(userId: string, researchWorkload: any): Promise<import("../entities/research-workload.entity").ResearchWorkload>;
}
