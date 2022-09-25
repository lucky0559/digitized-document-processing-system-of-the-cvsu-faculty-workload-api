import { ExtensionWorkload } from '../entities/extension-workload.entity';
export declare class ExtensionWorkloadService {
    saveExtensionWorkload(extensionWorkload: ExtensionWorkload, userId: string): Promise<ExtensionWorkload>;
}
