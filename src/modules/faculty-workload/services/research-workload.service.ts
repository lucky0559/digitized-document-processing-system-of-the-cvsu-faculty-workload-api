import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { ResearchWorkload } from '../entities/research-workload.entity';

const researchWorkloadRepository =
  AppDataSource.getRepository(ResearchWorkload);

@Injectable()
export class ResearchWorkloadService {
  public async saveResearchWorkload(
    researchWorkload: ResearchWorkload,
    userId: string,
  ) {
    researchWorkload.userID = userId;
    return await researchWorkloadRepository.save(researchWorkload);
  }
}
