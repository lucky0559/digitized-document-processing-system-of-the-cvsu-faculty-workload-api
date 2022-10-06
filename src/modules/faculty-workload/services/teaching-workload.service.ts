import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ExtensionWorkload } from '../entities/extension-workload.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';
import { TeachingWorkload } from '../entities/teaching-workload.entity';

const teachingWorkloadRepository =
  AppDataSource.getRepository(TeachingWorkload);
const researchWorkloadRepository =
  AppDataSource.getRepository(ResearchWorkload);
const extensionWorkloadRepository =
  AppDataSource.getRepository(ExtensionWorkload);
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

  public async getAllExtensionWorkload() {
    const extensionWorkloads = await extensionWorkloadRepository.find();
    const data = [];
    for (let i = 0; extensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: extensionWorkloads[i].userID })
        .getOne();
      user.extensionActivityFilePath =
        extensionWorkloads[i].extensionActivityFilePath;
      user.certificateFilePath = extensionWorkloads[i].certificateFilePath;
      user.summaryOfHoursFilePath =
        extensionWorkloads[i].summaryOfHoursFilePath;
      data.push(user);
    }

    return data;
  }
}
