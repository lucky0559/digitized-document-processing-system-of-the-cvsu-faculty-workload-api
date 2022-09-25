import { TeachingWorkload } from '../entities/teaching-workload.entity';
export declare class TeachingWorkloadService {
    saveTeachingWorkload(teachingWorkload: TeachingWorkload, userId: string): Promise<TeachingWorkload>;
}
