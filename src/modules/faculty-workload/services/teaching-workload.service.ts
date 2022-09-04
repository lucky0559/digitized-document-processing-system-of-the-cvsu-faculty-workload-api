import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { TeachingWorkload } from '../entities/teaching-workload.entity';

const teachingWorkloadRepository =
  AppDataSource.getRepository(TeachingWorkload);

@Injectable()
export class TeachingWorkloadService {
  public async saveTeachingWorkload(
    teachingWorkload: TeachingWorkload,
    userId: string,
  ) {
    teachingWorkload.userID = userId;
    return await teachingWorkloadRepository.save(teachingWorkload);
  }
}
