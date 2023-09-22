import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class StrategicFunctionWorkloadService {
    saveStrategicFunctionWorkload(strategicFunctionWorkload: StrategicFunctionWorkload, userId: string): Promise<import("typeorm").InsertResult>;
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
