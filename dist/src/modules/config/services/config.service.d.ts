import { Config } from '../entities/config.entity';
export declare class ConfigService {
    getAllConfig(): Promise<Config>;
    getHourlyRate(): Promise<number>;
    updateSemester(semester: string): Promise<import("typeorm").UpdateResult>;
    updateSchoolYear(schoolYearStart: number, schoolYearEnd: number): Promise<import("typeorm").UpdateResult>;
    updateSubmissionRange(submissionDateStart: Date, submissionDateEnd: Date): Promise<import("typeorm").UpdateResult>;
    updateHourlyRate(hourlyRate: number): Promise<import("typeorm").UpdateResult>;
}
