import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class StrategicFunctionWorkloadController {
    private readonly strategicFunctionWorkloadService;
    constructor(strategicFunctionWorkloadService: StrategicFunctionWorkloadService);
    strategicFunction(): Promise<string>;
    saveTeachingWorkload(userId: string, strategicFunctionWorkload: any): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload>;
    getAllPendingStrategicWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingStrategicWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingStrategicWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<import("../entities/strategic-function-workload.entity").StrategicFunctionWorkload[]>;
}
