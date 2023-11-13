import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import {
  RemarksAndPoints,
  TeachingWorkload,
} from '../entities/teaching-workload.entity';

const teachingWorkloadRepository =
  AppDataSource.getRepository(TeachingWorkload);

const userRepository = AppDataSource.getRepository(User);

if (!AppDataSource.isInitialized) {
  AppDataSource.initialize();
}

@Injectable()
export class TeachingWorkloadService {
  public async saveTeachingWorkload(
    teachingWorkload: TeachingWorkload,
    userId: string,
  ) {
    teachingWorkload.userID = userId;
    teachingWorkload.status = 'pending';
    teachingWorkload.currentProcessRole = 'Department Chairperson';
    await teachingWorkloadRepository.save(teachingWorkload);
    return AppDataSource.destroy();
  }

  public async getAllPendingTeachingWorkloadDC(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
    const pendingTeachingWorkloads = await teachingWorkloadRepository
      .createQueryBuilder('teaching-workload')
      .where('teaching-workload.status = :status', {
        status: 'pending',
      })
      .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Department Chairperson',
      })
      .andWhere('teaching-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .andWhere('user.department = :department', {
          department: reviewee.department,
        })
        .getOne();
      AppDataSource.destroy();
      if (user) {
        user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
        user.workloadId = pendingTeachingWorkloads[i].id;
        data.push(user);
      }
    }
    return data;
  }

  public async getAllPendingTeachingWorkloadDean(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
    const pendingTeachingWorkloads = await teachingWorkloadRepository
      .createQueryBuilder('teaching-workload')
      .where('teaching-workload.status = :status', {
        status: 'pending',
      })
      .andWhere('teaching-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Dean',
      })
      .andWhere('teaching-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .getOne();
      AppDataSource.destroy();
      if (user) {
        user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
        user.workloadId = pendingTeachingWorkloads[i].id;
        data.push(user);
      }
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
      .andWhere('teaching-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .getOne();
      AppDataSource.destroy();
      if (user) {
        user.twlFilePath = pendingTeachingWorkloads[i].twlFilePath;
        user.workloadId = pendingTeachingWorkloads[i].id;
        data.push(user);
      }
    }

    return data.reduce((group, workload) => {
      const { campus } = workload;
      group[campus] = group[campus] ?? [];
      group[campus].push(workload);
      return group;
    }, {});
  }

  public async approveWorkload(workloadId: string) {
    const workload = await teachingWorkloadRepository.findBy({
      id: workloadId,
    });
    if (workload[0].currentProcessRole === 'Department Chairperson') {
      workload[0].currentProcessRole = 'Dean';
    } else if (workload[0].currentProcessRole === 'Dean') {
      workload[0].currentProcessRole = 'OVPAA';
    }
    await teachingWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

  public async ovpaaApproveWorkload(
    remarks: RemarksAndPoints,
    role: string,
    deanPoints?: any,
  ) {
    const workload = await teachingWorkloadRepository.findOneBy({
      id: remarks.key,
    });
    if (role === 'OVPAA') {
      workload.status = 'approved';
      workload.currentProcessRole = '';
      workload.remarks = remarks;
    } else {
      workload.currentProcessRole = 'OVPAA';
      workload.deanPoints = deanPoints || [];
    }
    await teachingWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

  public async disapproveWorkload(workloadId: string) {
    const workload = await teachingWorkloadRepository.findBy({
      id: workloadId,
    });
    workload[0].status = 'disapproved';
    await teachingWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

  public async getWorkloadRemarksFaculty(userId: string) {
    const workloadRemarks = await teachingWorkloadRepository
      .createQueryBuilder('teaching-workload')
      .where('teaching-workload.userID = :userId', {
        userId,
      })
      .getMany();
    const data = [];
    const user = await userRepository.findOneBy({
      id: userId,
    });
    AppDataSource.destroy();
    for (let i = 0; workloadRemarks.length > i; i++) {
      user.twlFilePath = workloadRemarks[i].twlFilePath;
      user.workloadId = workloadRemarks[i].id;
      data.push(user);
    }
    return data;
  }

  public async getAllPendingWorkload(email: string) {
    const user = await userRepository.findOneBy({ email: email });
    const teachingWorkload = await teachingWorkloadRepository.findBy({
      userID: user.id,
    });
    AppDataSource.destroy();
    return teachingWorkload;
  }

  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    userId: string,
    currentProcessRole: string,
  ) {
    const teachingWorkload = await teachingWorkloadRepository.findBy({
      userID: userId,
      currentProcessRole: currentProcessRole,
    });
    AppDataSource.destroy();
    return teachingWorkload;
  }

  public async getSavedWorkload(userId: string): Promise<TeachingWorkload> {
    const data = await teachingWorkloadRepository.findOneBy({
      userID: userId,
      isSubmitted: false,
    });
    AppDataSource.destroy();
    return data;
  }

  public async submitWorkload(id: string) {
    const workload = await teachingWorkloadRepository.findOneBy({ id });
    workload.isSubmitted = true;
    await teachingWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }
}
