import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ExtensionWorkload } from '../entities/extension-workload.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';
import {
  RemarksAndPoints,
  TeachingWorkload,
} from '../entities/teaching-workload.entity';

const extensionWorkloadRepository =
  AppDataSource.getRepository(ExtensionWorkload);
const userRepository = AppDataSource.getRepository(User);
const researchWorkloadRepository =
  AppDataSource.getRepository(ResearchWorkload);
const strategicWorkloadRepository = AppDataSource.getRepository(
  StrategicFunctionWorkload,
);
const teachingWorkloadRepository =
  AppDataSource.getRepository(TeachingWorkload);

@Injectable()
export class ExtensionWorkloadService {
  public async saveExtensionWorkload(
    extensionWorkload: ExtensionWorkload,
    userId: string,
  ) {
    extensionWorkload.userID = userId;
    extensionWorkload.status = 'pending';
    extensionWorkload.currentProcessRole = 'Department Chairperson';
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
      if (user) {
        user.extensionActivityFilePath =
          pendingExtensionWorkloads[i].extensionActivityFilePath;
        user.certificateFilePath =
          pendingExtensionWorkloads[i].certificateFilePath;
        user.summaryOfHoursFilePath =
          pendingExtensionWorkloads[i].summaryOfHoursFilePath;
        user.workloadId = pendingExtensionWorkloads[i].id;
        data.push(user);
      }
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
      if (user) {
        user.extensionActivityFilePath =
          pendingExtensionWorkloads[i].extensionActivityFilePath;
        user.certificateFilePath =
          pendingExtensionWorkloads[i].certificateFilePath;
        user.summaryOfHoursFilePath =
          pendingExtensionWorkloads[i].summaryOfHoursFilePath;
        user.workloadId = pendingExtensionWorkloads[i].id;
        data.push(user);
      }
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
      if (user) {
        user.extensionActivityFilePath =
          pendingExtensionWorkloads[i].extensionActivityFilePath;
        user.certificateFilePath =
          pendingExtensionWorkloads[i].certificateFilePath;
        user.summaryOfHoursFilePath =
          pendingExtensionWorkloads[i].summaryOfHoursFilePath;
        user.workloadId = pendingExtensionWorkloads[i].id;
        data.push(user);
      }
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
    }
    return await extensionWorkloadRepository.save(workload);
  }

  public async ovpaaApproveWorkload(remarks: RemarksAndPoints) {
    const workload = await extensionWorkloadRepository.findBy({
      id: remarks.key,
    });
    workload[0].status = 'approved';
    workload[0].currentProcessRole = '';
    workload[0].remarks = remarks;
    return await extensionWorkloadRepository.save(workload);
  }

  // public async remarksWorkload(workloadId: string, remarks: string) {
  //   const workload = await extensionWorkloadRepository.findBy({
  //     id: workloadId,
  //   });
  //   workload[0].remarks = remarks;
  //   workload[0].status = 'remarks';
  //   return await extensionWorkloadRepository.save(workload);
  // }

  public async getWorkloadRemarksFaculty(userId: string) {
    const workloadRemarks = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'remarks' })
      .andWhere('extension-workload.userID = :userId', {
        userId,
      })
      .getMany();
    const data = [];
    const user = await userRepository.findOneBy({
      id: userId,
    });
    for (let i = 0; workloadRemarks.length > i; i++) {
      user.extensionActivityFilePath =
        workloadRemarks[i].extensionActivityFilePath;
      user.certificateFilePath = workloadRemarks[i].certificateFilePath;
      user.summaryOfHoursFilePath = workloadRemarks[i].summaryOfHoursFilePath;
      user.workloadId = workloadRemarks[i].id;
      data.push(user);
    }
    return data;
  }

  public async getAllTotalWorkloadPointsApproved() {
    const extensionWorkloads = await extensionWorkloadRepository.findBy({
      status: 'approved',
    });
    const researchWorkloads = await researchWorkloadRepository.findBy({
      status: 'approved',
    });
    const strategicWorkloads = await strategicWorkloadRepository.findBy({
      status: 'approved',
    });
    const teachingWorkloads = await teachingWorkloadRepository.findBy({
      status: 'approved',
    });
    const users = [];
    const filteredUsers = [];
    for (let i = 0; i < extensionWorkloads.length; i++) {
      const user = await userRepository.findOneBy({
        id: extensionWorkloads[i].userID,
      });
      users.push(user);
    }
    for (let i = 0; i < researchWorkloads.length; i++) {
      const user = await userRepository.findOneBy({
        id: researchWorkloads[i].userID,
      });
      users.push(user);
    }
    for (let i = 0; i < strategicWorkloads.length; i++) {
      const user = await userRepository.findOneBy({
        id: strategicWorkloads[i].userID,
      });
      users.push(user);
    }
    for (let i = 0; i < teachingWorkloads.length; i++) {
      const user = await userRepository.findOneBy({
        id: teachingWorkloads[i].userID,
      });
      users.push(user);
    }
    const filtered = users.filter((element) => {
      const isDuplicate = filteredUsers.includes(element.id);

      if (!isDuplicate) {
        filteredUsers.push(element.id);
        return true;
      }
      return false;
    });
    return filtered;
  }

  public async getAllPendingWorkload(email: string) {
    const user = await userRepository.findOneBy({ email: email });
    const strategicWorkload = await extensionWorkloadRepository.findBy({
      userID: user.id,
      status: 'pending',
    });
    return strategicWorkload;
  }

  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    userId: string,
    currentProcessRole: string,
  ) {
    const extensionWorkload = await extensionWorkloadRepository.findBy({
      userID: userId,
      currentProcessRole: currentProcessRole,
    });
    return extensionWorkload;
  }
}
