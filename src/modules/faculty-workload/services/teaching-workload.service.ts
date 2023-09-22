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

@Injectable()
export class TeachingWorkloadService {
  public async saveTeachingWorkload(
    teachingWorkload: TeachingWorkload,
    userId: string,
  ) {
    teachingWorkload.userID = userId;
    teachingWorkload.status = 'pending';
    teachingWorkload.currentProcessRole = 'Department Chairperson';
    return await teachingWorkloadRepository.save(teachingWorkload);
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
      .getMany();
    const data = [];
    for (let i = 0; pendingTeachingWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingTeachingWorkloads[i].userID })
        .getOne();
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
    return await teachingWorkloadRepository.save(workload);
  }

  public async ovpaaApproveWorkload(remarks: RemarksAndPoints) {
    const workload = await teachingWorkloadRepository.findBy({
      id: remarks.key,
    });
    workload[0].status = 'approved';
    workload[0].currentProcessRole = '';
    workload[0].remarks = remarks;
    return await teachingWorkloadRepository.save(workload);
  }

  public async disapproveWorkload(workloadId: string) {
    const workload = await teachingWorkloadRepository.findBy({
      id: workloadId,
    });
    workload[0].status = 'disapproved';
    return await teachingWorkloadRepository.save(workload);
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
    return teachingWorkload;
  }

  public async getSavedWorkload(userId: string): Promise<TeachingWorkload> {
    return await teachingWorkloadRepository.findOneBy({
      userID: userId,
      isSubmitted: false,
    });
  }

  public async submitWorkload(id: string) {
    const workload = await teachingWorkloadRepository.findOneBy({ id });
    workload.isSubmitted = true;
    return await teachingWorkloadRepository.save(workload);
  }
}
