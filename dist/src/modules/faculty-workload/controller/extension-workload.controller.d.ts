import { ExtensionWorkloadService } from '../services/extension-workload.service';
export declare class ExtensionWorkloadController {
    private readonly extensionWorkloadService;
    constructor(extensionWorkloadService: ExtensionWorkloadService);
    extension(): Promise<string>;
    saveExtensionWorkload(userId: string, extensionWorkload: any): Promise<import("../entities/extension-workload.entity").ExtensionWorkload>;
}
