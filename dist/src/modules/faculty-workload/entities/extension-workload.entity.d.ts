import { RemarksAndPoints } from './teaching-workload.entity';
export declare class ExtensionWorkload {
    id: string;
    userID: string;
    designationExtensionActivity: string;
    extensionActivityFilePath: string;
    extensionActivityFilename: string;
    resourcePerson: string;
    certificateFilePath: string;
    certificateFilenames: string;
    totalNumberHours: string;
    summaryOfHoursFilePath: string;
    summaryOfHoursFilename: string;
    ewlPoints: number;
    status: string;
    currentProcessRole: string;
    remarks: RemarksAndPoints;
    isSubmitted: boolean;
}
