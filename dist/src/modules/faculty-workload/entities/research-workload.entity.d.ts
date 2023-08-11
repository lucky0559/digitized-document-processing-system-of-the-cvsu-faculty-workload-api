import { RemarksAndPoints } from './teaching-workload.entity';
export declare class ResearchWorkload {
    id: string;
    userID: string;
    titleOfStudy: string;
    fundingOfStudy: string;
    typeOfStudy: string;
    designationStudy: string;
    fundGenerated: string;
    disseminatedResearch: string;
    rwlFilePath: string;
    rwlFilePath1: string;
    disseminatedResearchFilesPath: string;
    rwlPoints: number;
    status: string;
    currentProcessRole: string;
    remarks: RemarksAndPoints;
}
