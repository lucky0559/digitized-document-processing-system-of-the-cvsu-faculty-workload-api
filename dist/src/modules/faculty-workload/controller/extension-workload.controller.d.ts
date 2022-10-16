import { ExtensionWorkloadService } from '../services/extension-workload.service';
export declare class ExtensionWorkloadController {
    private readonly extensionWorkloadService;
    constructor(extensionWorkloadService: ExtensionWorkloadService);
    extension(): Promise<string>;
    saveExtensionWorkload(userId: string, extensionWorkload: any): Promise<import("../entities/extension-workload.entity").ExtensionWorkload>;
    getAllPendingExtensionWorkloadDC(): Promise<any[]>;
    getAllPendingExtensionWorkloadDean(): Promise<any[]>;
    getAllPendingExtensionWorkloadOVPAA(): Promise<any[]>;
    approveWorkload(workloadId: string): Promise<import("../entities/extension-workload.entity").ExtensionWorkload[]>;
    remarksWorkload(workloadId: string, remarks: string): Promise<import("../entities/extension-workload.entity").ExtensionWorkload[]>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
}
