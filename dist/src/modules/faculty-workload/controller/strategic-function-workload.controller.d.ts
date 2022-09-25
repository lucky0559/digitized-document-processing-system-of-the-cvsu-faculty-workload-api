import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';
export declare class StrategicFunctionWorkloadController {
    private readonly strategicFunctionWorkloadService;
    constructor(strategicFunctionWorkloadService: StrategicFunctionWorkloadService);
    strategicFunction(): Promise<string>;
    saveTeachingWorkload(userId: string, strategicFunctionWorkload: any): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload>;
}
