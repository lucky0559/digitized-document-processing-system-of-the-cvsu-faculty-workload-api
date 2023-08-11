import { ExtensionWorkloadService } from '../services/extension-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class ExtensionWorkloadController {
    private readonly extensionWorkloadService;
    constructor(extensionWorkloadService: ExtensionWorkloadService);
    extension(): Promise<string>;
    saveExtensionWorkload(userId: string, extensionWorkload: any): Promise<import("../entities/extension-workload.entity").ExtensionWorkload>;
    getAllPendingExtensionWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingExtensionWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingExtensionWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<import("../entities/extension-workload.entity").ExtensionWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints): Promise<import("../entities/extension-workload.entity").ExtensionWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllTotalWorkloadPointsApproved(): Promise<import("../../user/entities/user.entity").User[]>;
    getAllPendingWorkload(email: string): Promise<import("../entities/extension-workload.entity").ExtensionWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<import("../entities/extension-workload.entity").ExtensionWorkload[]>;
}
