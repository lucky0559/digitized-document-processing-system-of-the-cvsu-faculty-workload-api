import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';

const researchWorkloadRepository =
  AppDataSource.getRepository(ResearchWorkload);
const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class ResearchWorkloadService {
  public async saveResearchWorkload(
    researchWorkload: ResearchWorkload,
    userId: string,
  ) {
    researchWorkload.userID = userId;
    return await researchWorkloadRepository.save(researchWorkload);
  }

  public async getAllResearchWorkload() {
    const researchWorkloads = await researchWorkloadRepository.find();
    const data = [];
    for (let i = 0; researchWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: researchWorkloads[i].userID })
        .getOne();
      user.rwlFilePath = researchWorkloads[i].rwlFilePath;
      user.rwlFilePath1 = researchWorkloads[i].rwlFilePath1;
      user.rwlFilePath2 = researchWorkloads[i].rwlFilePath2;
      data.push(user);
    }

    return data;
  }
}
