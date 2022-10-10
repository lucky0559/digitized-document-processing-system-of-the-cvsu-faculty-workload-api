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

  public async getAllPendingTeachingWorkloadDC() {
    const pendingTeachingWorkloads = await teachingWorkloadRepository
      .createQueryBuilder('teaching-workload')
      .where('teaching-workload.status = :status', {
        status: 'pending',
      })
      .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Department Chairperson',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .getOne();
      user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
      user.workloadId = pendingTeachingWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingTeachingWorkloadDean() {
    const pendingTeachingWorkloads = await teachingWorkloadRepository
      .createQueryBuilder('teaching-workload')
      .where('teaching-workload.status = :status', {
        status: 'pending',
      })
      .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Dean',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .getOne();
      user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
      user.workloadId = pendingTeachingWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingTeachingWorkloadOVPAA() {
    const pendingTeachingWorkloads = await teachingWorkloadRepository
      .createQueryBuilder('teaching-workload')
      .where('teaching-workload.status = :status', {
        status: 'pending',
      })
      .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'OVPAA',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .getOne();
      user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
      user.workloadId = pendingTeachingWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async approveWorkload(workloadId: string) {
    const workload = await teachingWorkloadRepository.findBy({
      id: workloadId,
    });
    if (workload[0].currentProcessRole === 'Department Chairperson') {
      workload[0].currentProcessRole = 'Dean';
    } else if (workload[0].currentProcessRole === 'Dean') {
      workload[0].currentProcessRole = 'OVPAA';
    } else if (workload[0].currentProcessRole === 'OVPAA') {
      workload[0].status = 'approved';
      workload[0].currentProcessRole = '';
    }
    return await teachingWorkloadRepository.save(workload);
  }

  public async remarksWorkload(workloadId: string, remarks: string) {
    const workload = await teachingWorkloadRepository.findBy({
      id: workloadId,
    });
    workload[0].remarks = remarks;
    workload[0].status = 'remarks';
    return await teachingWorkloadRepository.save(workload);
  }
}
