import { RemarksAndPoints } from './teaching-workload.entity';
export declare type CvsuFunded = {
    title: string;
    typeOfStudy: string;
    designationStudy: string;
    filename?: string;
    filePath?: string;
    points: number;
};
export declare type ExternallyFunded = {
    title: string;
    fundGenerated: string;
    filename?: string;
    filePath?: string;
    points: number;
};
export declare class ResearchWorkload {
    id: string;
    userID: string;
    cvsuFunded: CvsuFunded;
    externallyFunded: ExternallyFunded;
    cvsuFundedFilenames: string;
    cvsuFundedFilePath: string;
    externallyFundedFilenames: string;
    externallyFundedFilePath: string;
    disseminatedResearch: string;
    disseminatedResearchFilesPath: string;
    rwlPoints: number;
    status: string;
    currentProcessRole: string;
    remarks: RemarksAndPoints;
    isSubmitted: boolean;
    disseminatedResearchFilenames: string;
}
