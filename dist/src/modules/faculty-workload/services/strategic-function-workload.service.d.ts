import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';
export declare class StrategicFunctionWorkloadService {
    saveStrategicFunctinWorkload(strategicFunctionWorkload: StrategicFunctionWorkload, userId: string): Promise<StrategicFunctionWorkload>;
    getAllPendingStrategicWorkloadDC(): Promise<any[]>;
    getAllPendingStrategicWorkloadDean(): Promise<any[]>;
    getAllPendingStrategicWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<StrategicFunctionWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<StrategicFunctionWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
