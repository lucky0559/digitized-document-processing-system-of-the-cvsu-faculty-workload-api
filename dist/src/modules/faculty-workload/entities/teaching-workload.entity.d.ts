export declare type RemarksAndPoints = {
    key: string;
    points: string;
    remarks: string;
};
export declare class TeachingWorkload {
    id: string;
    userID: string;
    numberOfPreparations: string;
    contactHours: string;
    totalNoOfStudents: string;
    twlFilePath: string;
    totalTeachingWorkload: number;
    status: string;
    currentProcessRole: string;
    remarks: RemarksAndPoints;
    isSubmitted: boolean;
}
