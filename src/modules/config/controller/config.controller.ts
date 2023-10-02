import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ConfigService } from '../services/config.service';
import { Config } from '../entities/config.entity';

@Controller('/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  public async getConfig(): Promise<Config> {
    return this.configService.getAllConfig();
  }

  @Get('hourly-rate')
  public async getHourlyRate(): Promise<number> {
    return this.configService.getHourlyRate();
  }

  @Patch(':semester/update/semester')
  public async updateSemester(@Param('semester') semester: string) {
    return this.configService.updateSemester(semester);
  }

  @Patch(':schoolYearStart/:schoolYearEnd/update/school-year')
  public async updateSchoolYear(
    @Param('schoolYearStart') schoolYearStart: number,
    @Param('schoolYearEnd') schoolYearEnd: number,
  ) {
    return this.configService.updateSchoolYear(schoolYearStart, schoolYearEnd);
  }

  @Patch(':submissionDateStart/:submissionDateEnd/update/submission-range')
  public async updateSubmissionRange(
    @Param('submissionDateStart') submissionDateStart: Date,
    @Param('submissionDateEnd') submissionDateEnd: Date,
  ) {
    return this.configService.updateSubmissionRange(
      submissionDateStart,
      submissionDateEnd,
    );
  }

  @Patch(':hourlyRate/update/hourly-rate')
  public async updateHourlyRate(@Param('hourlyRate') hourlyRate: number) {
    return this.configService.updateHourlyRate(hourlyRate);
  }
}
