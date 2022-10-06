import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { TeachingWorkload } from '../entities/teaching-workload.entity';

const teachingWorkloadRepository =
  AppDataSource.getRepository(TeachingWorkload);

const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class TeachingWorkloadService {
  public async saveTeachingWorkload(
    teachingWorkload: TeachingWorkload,
    userId: string,
  ) {
    teachingWorkload.userID = userId;
    return await teachingWorkloadRepository.save(teachingWorkload);
  }

  public async getAllTeachingWorkload() {
    const teachingWorkloads = await teachingWorkloadRepository.find();
    const data = [];
    for (let i = 0; teachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: teachingWorkloads[i].userID })
        .getOne();
      user.twlFilePath = teachingWorkloads[i].twlFilePath;
      data.push(user);
    }

    return data;
  }
}
