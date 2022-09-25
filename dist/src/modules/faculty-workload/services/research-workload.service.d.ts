import { ResearchWorkload } from '../entities/research-workload.entity';
export declare class ResearchWorkloadService {
    saveResearchWorkload(researchWorkload: ResearchWorkload, userId: string): Promise<ResearchWorkload>;
}
