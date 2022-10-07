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

  public async getAllPendingResearchWorkloadDC() {
    const pendingResearchWorkloads = await researchWorkloadRepository
      .createQueryBuilder('research-workload')
      .where('research-workload.status = :status', { status: 'pending' })
      .andWhere('research-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Department Chairperson',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingResearchWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
        .getOne();
      user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
      user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
      user.rwlFilePath2 = pendingResearchWorkloads[i].rwlFilePath2;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingResearchWorkloadDean() {
    const pendingResearchWorkloads = await researchWorkloadRepository
      .createQueryBuilder('research-workload')
      .where('research-workload.status = :status', { status: 'pending' })
      .andWhere('research-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Dean',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingResearchWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
        .getOne();
      user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
      user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
      user.rwlFilePath2 = pendingResearchWorkloads[i].rwlFilePath2;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingResearchWorkloadOVPAA() {
    const pendingResearchWorkloads = await researchWorkloadRepository
      .createQueryBuilder('research-workload')
      .where('research-workload.status = :status', { status: 'pending' })
      .andWhere('research-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'OVPAA',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingResearchWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
        .getOne();
      user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
      user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
      user.rwlFilePath2 = pendingResearchWorkloads[i].rwlFilePath2;
      data.push(user);
    }

    return data;
  }
}
