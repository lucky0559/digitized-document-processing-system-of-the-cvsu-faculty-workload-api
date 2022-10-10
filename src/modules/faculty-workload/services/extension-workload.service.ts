import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ExtensionWorkload } from '../entities/extension-workload.entity';

const extensionWorkloadRepository =
  AppDataSource.getRepository(ExtensionWorkload);
const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class ExtensionWorkloadService {
  public async saveExtensionWorkload(
    extensionWorkload: ExtensionWorkload,
    userId: string,
  ) {
    extensionWorkload.userID = userId;
    return await extensionWorkloadRepository.save(extensionWorkload);
  }

  public async getAllPendingExtensionWorkloadDC() {
    const pendingExtensionWorkloads = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'pending' })
      .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Department Chairperson',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
        .getOne();
      user.extensionActivityFilePath =
        pendingExtensionWorkloads[i].extensionActivityFilePath;
      user.certificateFilePath =
        pendingExtensionWorkloads[i].certificateFilePath;
      user.summaryOfHoursFilePath =
        pendingExtensionWorkloads[i].summaryOfHoursFilePath;
      user.workloadId = pendingExtensionWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingExtensionWorkloadDean() {
    const pendingExtensionWorkloads = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'pending' })
      .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Dean',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
        .getOne();
      user.extensionActivityFilePath =
        pendingExtensionWorkloads[i].extensionActivityFilePath;
      user.certificateFilePath =
        pendingExtensionWorkloads[i].certificateFilePath;
      user.summaryOfHoursFilePath =
        pendingExtensionWorkloads[i].summaryOfHoursFilePath;
      user.workloadId = pendingExtensionWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingExtensionWorkloadOVPAA() {
    const pendingExtensionWorkloads = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'pending' })
      .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'OVPAA',
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
        .getOne();
      user.extensionActivityFilePath =
        pendingExtensionWorkloads[i].extensionActivityFilePath;
      user.certificateFilePath =
        pendingExtensionWorkloads[i].certificateFilePath;
      user.summaryOfHoursFilePath =
        pendingExtensionWorkloads[i].summaryOfHoursFilePath;
      user.workloadId = pendingExtensionWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async approveWorkload(workloadId: string) {
    const workload = await extensionWorkloadRepository.findBy({
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
    return await extensionWorkloadRepository.save(workload);
  }
}
