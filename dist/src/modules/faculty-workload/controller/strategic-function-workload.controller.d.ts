import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';
export declare class StrategicFunctionWorkloadController {
    private readonly strategicFunctionWorkloadService;
    constructor(strategicFunctionWorkloadService: StrategicFunctionWorkloadService);
    strategicFunction(): Promise<string>;
    saveStrategicFunctinWorkload(userId: string, strategicFunctionWorkload: any): Promise<import("typeorm").InsertResult>;
    getAllPendingStrategicWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingStrategicWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingStrategicWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<StrategicFunctionWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<StrategicFunctionWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllPendingWorkload(email: string): Promise<StrategicFunctionWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<StrategicFunctionWorkload[]>;
    getSavedWorkload(userId: string): Promise<StrategicFunctionWorkload>;
    submitWorkload(id: string): Promise<StrategicFunctionWorkload>;
}
