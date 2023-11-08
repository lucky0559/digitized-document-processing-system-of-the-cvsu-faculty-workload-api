import { User } from '../../user/entities/user.entity';
import { ExtensionWorkload } from '../entities/extension-workload.entity';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
export declare class ExtensionWorkloadService {
    saveExtensionWorkload(extensionWorkload: ExtensionWorkload, userId: string): Promise<ExtensionWorkload>;
    getAllPendingExtensionWorkloadDC(userId: string): Promise<any[]>;
    getAllPendingExtensionWorkloadDean(userId: string): Promise<any[]>;
    getAllPendingExtensionWorkloadOVPAA(): Promise<any>;
    approveWorkload(workloadId: string): Promise<ExtensionWorkload[]>;
    ovpaaApproveWorkload(remarks: RemarksAndPoints, role: string, deanPoints?: any): Promise<ExtensionWorkload>;
    getWorkloadRemarksFaculty(userId: string): Promise<any[]>;
    getAllTotalWorkloadPointsApproved(): Promise<{}>;
    getAllTotalWorkloadDeanDeptPointsApproved(role: string, campus: string, department: string): Promise<User[]>;
    getAllPendingWorkload(email: string): Promise<ExtensionWorkload[]>;
    getAllPendingWorkloadByIdAndCurrentProcessRole(userId: string, currentProcessRole: string): Promise<ExtensionWorkload[]>;
    getSavedWorkload(userId: string): Promise<ExtensionWorkload>;
    submitWorkload(id: string): Promise<ExtensionWorkload>;
}
