import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { Config } from '../entities/config.entity';

const configRepository = AppDataSource.getRepository(Config);

@Injectable()
export class ConfigService {
  public async getAllConfig(): Promise<Config> {
    const config = await configRepository.find();
    return config[0];
  }

  public async getHourlyRate(): Promise<number> {
    const config = await configRepository.find();
    return config[0].hourlyRate;
  }

  public async updateSemester(semester: string) {
    const config = await configRepository.find();
    return configRepository.update(config[0].id, {
      semester,
    });
  }

  public async updateSchoolYear(
    schoolYearStart: number,
    schoolYearEnd: number,
  ) {
    const config = await configRepository.find();
    return configRepository.update(config[0].id, {
      schoolYearStart,
      schoolYearEnd,
    });
  }

  public async updateSubmissionRange(
    submissionDateStart: Date,
    submissionDateEnd: Date,
  ) {
    const config = await configRepository.find();
    return configRepository.update(config[0].id, {
      submissionDateStart: new Date(submissionDateStart).toISOString(),
      submissionDateEnd: new Date(submissionDateEnd).toISOString(),
    });
  }

  public async updateHourlyRate(hourlyRate: number) {
    const config = await configRepository.find();
    return configRepository.update(config[0].id, {
      hourlyRate,
    });
  }
}
