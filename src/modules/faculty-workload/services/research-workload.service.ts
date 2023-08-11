import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

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
    researchWorkload.status = 'pending';
    researchWorkload.currentProcessRole = 'Department Chairperson';
    return await researchWorkloadRepository.save(researchWorkload);
  }

  public async getAllPendingResearchWorkloadDC(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
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
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .andWhere('user.department = :department', {
          department: reviewee.department,
        })
        .getOne();
      if (user) {
        user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
        user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
        user.disseminatedResearchFilesPath =
          pendingResearchWorkloads[i].disseminatedResearchFilesPath;
        user.workloadId = pendingResearchWorkloads[i].id;
        data.push(user);
      }
    }
    return data;
  }

  public async getAllPendingResearchWorkloadDean(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
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
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .getOne();
      if (user) {
        user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
        user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
        user.disseminatedResearchFilesPath =
          pendingResearchWorkloads[i].disseminatedResearchFilesPath;
        user.workloadId = pendingResearchWorkloads[i].id;
        data.push(user);
      }
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
      if (user) {
        user.rwlFilePath = pendingResearchWorkloads[i].rwlFilePath;
        user.rwlFilePath1 = pendingResearchWorkloads[i].rwlFilePath1;
        user.disseminatedResearchFilesPath =
          pendingResearchWorkloads[i].disseminatedResearchFilesPath;
        user.workloadId = pendingResearchWorkloads[i].id;
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
    const workload = await researchWorkloadRepository.findBy({
      id: workloadId,
    });
    if (workload[0].currentProcessRole === 'Department Chairperson') {
      workload[0].currentProcessRole = 'Dean';
    } else if (workload[0].currentProcessRole === 'Dean') {
      workload[0].currentProcessRole = 'OVPAA';
    }
    return await researchWorkloadRepository.save(workload);
  }

  public async ovpaaApproveWorkload(remarks: RemarksAndPoints) {
    const workload = await researchWorkloadRepository.findOneBy({
      id: remarks.key,
    });
    workload.status = 'approved';
    workload.currentProcessRole = '';
    workload.remarks = remarks;
    return await researchWorkloadRepository.save(workload);
  }

  // public async remarksWorkload(workloadId: string, remarks: string) {
  //   const workload = await researchWorkloadRepository.findBy({
  //     id: workloadId,
  //   });
  //   workload[0].remarks = remarks;
  //   workload[0].status = 'remarks';
  //   return await researchWorkloadRepository.save(workload);
  // }

  public async getWorkloadRemarksFaculty(userId: string) {
    const workloadRemarks = await researchWorkloadRepository
      .createQueryBuilder('research-workload')
      .where('research-workload.status = :status', { status: 'remarks' })
      .andWhere('research-workload.userID = :userId', {
        userId,
      })
      .getMany();
    const data = [];
    const user = await userRepository.findOneBy({
      id: userId,
    });
    for (let i = 0; workloadRemarks.length > i; i++) {
      user.rwlFilePath = workloadRemarks[i].rwlFilePath;
      user.rwlFilePath1 = workloadRemarks[i].rwlFilePath1;
      user.disseminatedResearchFilesPath =
        workloadRemarks[i].disseminatedResearchFilesPath;
      user.workloadId = workloadRemarks[i].id;
      data.push(user);
    }
    return data;
  }

  public async getAllPendingWorkload(email: string) {
    const user = await userRepository.findOneBy({ email: email });
    const researchWorkload = await researchWorkloadRepository.findBy({
      userID: user.id,
    });
    return researchWorkload;
  }

  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    userId: string,
    currentProcessRole: string,
  ) {
    const researchWorkload = await researchWorkloadRepository.findBy({
      userID: userId,
      currentProcessRole: currentProcessRole,
    });
    return researchWorkload;
  }
}
