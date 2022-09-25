import { TeachingWorkloadService } from '../services/teaching-workload.service';
export declare class TeachingWorkloadController {
    private readonly teachingWorkloadService;
    constructor(teachingWorkloadService: TeachingWorkloadService);
    teach(): Promise<string>;
    saveTeachingWorkload(userId: string, teachingWorkload: any): Promise<import("../entities/teaching-workload.entity").TeachingWorkload>;
}
