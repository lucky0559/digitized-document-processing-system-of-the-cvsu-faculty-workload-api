import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

const researchWorkloadRepository =
  AppDataSource.getRepository(ResearchWorkload);
const userRepository = AppDataSource.getRepository(User);
if (!AppDataSource.isInitialized) {
  AppDataSource.initialize();
}

@Injectable()
export class ResearchWorkloadService {
  public async saveResearchWorkload(
    researchWorkload: ResearchWorkload,
    userId: string,
  ) {
    researchWorkload.userID = userId;
    researchWorkload.status = 'pending';
    researchWorkload.currentProcessRole = 'Department Chairperson';
    await researchWorkloadRepository.save(researchWorkload);
    return AppDataSource.destroy();
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
      .andWhere('research-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
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
      AppDataSource.destroy();
      if (user) {
        user.cvsuFunded = pendingResearchWorkloads[i].cvsuFunded;
        user.externallyFunded = pendingResearchWorkloads[i].externallyFunded;
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
      .andWhere('research-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
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
      AppDataSource.destroy();
      if (user) {
        user.cvsuFunded = pendingResearchWorkloads[i].cvsuFunded;
        user.externallyFunded = pendingResearchWorkloads[i].externallyFunded;
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
      .andWhere('research-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingResearchWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingResearchWorkloads[i].userID })
        .getOne();
      if (user) {
        user.cvsuFunded = pendingResearchWorkloads[i].cvsuFunded;
        user.externallyFunded = pendingResearchWorkloads[i].externallyFunded;
        user.disseminatedResearchFilesPath =
          pendingResearchWorkloads[i].disseminatedResearchFilesPath;
        user.workloadId = pendingResearchWorkloads[i].id;
        data.push(user);
      }
    }
    AppDataSource.destroy();
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
    }
    await researchWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

  public async ovpaaApproveWorkload(
    remarks: RemarksAndPoints,
    role: string,
    deanPoints?: any,
  ) {
    const workload = await researchWorkloadRepository.findOneBy({
      id: remarks.key,
    });
    if (role === 'OVPAA') {
      workload.status = 'approved';
      workload.currentProcessRole = '';
      workload.remarks = remarks;
    } else {
      workload.currentProcessRole = 'OVPAA';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workload.deanPoints = deanPoints || [];
    }
    await researchWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

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
    AppDataSource.destroy();
    for (let i = 0; workloadRemarks.length > i; i++) {
      user.cvsuFunded = workloadRemarks[i].cvsuFunded;
      user.externallyFunded = workloadRemarks[i].externallyFunded;
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
    AppDataSource.destroy();
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
    AppDataSource.destroy();
    return researchWorkload;
  }

  public async getSavedWorkload(userId: string): Promise<ResearchWorkload> {
    const data = await researchWorkloadRepository.findOneBy({
      userID: userId,
      isSubmitted: false,
    });
    AppDataSource.destroy();
    return data;
  }

  public async submitWorkload(id: string) {
    const workload = await researchWorkloadRepository.findOneBy({ id });
    workload.isSubmitted = true;
    await researchWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }
}
