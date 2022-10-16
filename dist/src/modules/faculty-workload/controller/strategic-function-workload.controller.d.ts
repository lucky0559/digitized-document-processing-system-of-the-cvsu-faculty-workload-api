import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';
export declare class StrategicFunctionWorkloadController {
    private readonly strategicFunctionWorkloadService;
    constructor(strategicFunctionWorkloadService: StrategicFunctionWorkloadService);
    strategicFunction(): Promise<string>;
    saveTeachingWorkload(userId: string, strategicFunctionWorkload: any): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload>;
    getAllPendingStrategicWorkloadDC(): Promise<any[]>;
    getAllPendingStrategicWorkloadDean(): Promise<any[]>;
    getAllPendingStrategicWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
