import { ExtensionWorkload } from '../entities/extension-workload.entity';
export declare class ExtensionWorkloadService {
    saveExtensionWorkload(extensionWorkload: ExtensionWorkload, userId: string): Promise<ExtensionWorkload>;
    getAllPendingExtensionWorkloadDC(): Promise<any[]>;
    getAllPendingExtensionWorkloadDean(): Promise<any[]>;
    getAllPendingExtensionWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<ExtensionWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<ExtensionWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
