import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

const strategicFunctionWorkloadRepository = AppDataSource.getRepository(
  StrategicFunctionWorkload,
);
const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class StrategicFunctionWorkloadService {
  public async saveStrategicFunctionWorkload(
    strategicFunctionWorkload: StrategicFunctionWorkload,
    userId: string,
  ) {
    strategicFunctionWorkload.userID = userId;
    strategicFunctionWorkload.status = 'pending';
    strategicFunctionWorkload.currentProcessRole = 'Department Chairperson';
    return await strategicFunctionWorkloadRepository.upsert(
      strategicFunctionWorkload,
      ['userID'],
    );
  }

  public async getAllPendingStrategicWorkloadDC(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
    const pendingStrategicWorkloads = await strategicFunctionWorkloadRepository
      .createQueryBuilder('strategic-function-workload')
      .where('strategic-function-workload.status = :status', {
        status: 'pending',
      })
      .andWhere(
        'strategic-function-workload.currentProcessRole = :currentProcessRole',
        {
          currentProcessRole: 'Department Chairperson',
        },
      )
      .andWhere('strategic-function-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .andWhere('user.department = :department', {
          department: reviewee.department,
        })
        .getOne();
      if (user) {
        user.approvedUniversityDesignationFilePath =
          pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
        user.approvedCollegeCampusDesignationFilePath =
          pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
        user.approvedDepartmentDesignationFilePath =
          pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
        user.listOfAdviseesFilePath =
          pendingStrategicWorkloads[i].academicAdviseesFilePath;
        user.workloadId = pendingStrategicWorkloads[i].id;
        data.push(user);
      }
    }
    return data;
  }

  public async getAllPendingStrategicWorkloadDean(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
    const pendingStrategicWorkloads = await strategicFunctionWorkloadRepository
      .createQueryBuilder('strategic-function-workload')
      .where('strategic-function-workload.status = :status', {
        status: 'pending',
      })
      .andWhere(
        'strategic-function-workload.currentProcessRole = :currentProcessRole',
        {
          currentProcessRole: 'Dean',
        },
      )
      .andWhere('strategic-function-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .getOne();
      if (user) {
        user.approvedUniversityDesignationFilePath =
          pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
        user.approvedCollegeCampusDesignationFilePath =
          pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
        user.approvedDepartmentDesignationFilePath =
          pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
        user.listOfAdviseesFilePath =
          pendingStrategicWorkloads[i].academicAdviseesFilePath;
        user.workloadId = pendingStrategicWorkloads[i].id;
        data.push(user);
      }
    }

    return data;
  }

  public async getAllPendingStrategicWorkloadOVPAA() {
    const pendingStrategicWorkloads = await strategicFunctionWorkloadRepository
      .createQueryBuilder('strategic-function-workload')
      .where('strategic-function-workload.status = :status', {
        status: 'pending',
      })
      .andWhere(
        'strategic-function-workload.currentProcessRole = :currentProcessRole',
        {
          currentProcessRole: 'OVPAA',
        },
      )
      .andWhere('strategic-function-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
        .getOne();
      if (user) {
        user.approvedUniversityDesignationFilePath =
          pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
        user.approvedCollegeCampusDesignationFilePath =
          pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
        user.approvedDepartmentDesignationFilePath =
          pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
        user.listOfAdviseesFilePath =
          pendingStrategicWorkloads[i].academicAdviseesFilePath;
        user.workloadId = pendingStrategicWorkloads[i].id;
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
    const workload = await strategicFunctionWorkloadRepository.findBy({
      id: workloadId,
    });

    if (workload[0].currentProcessRole === 'Department Chairperson') {
      workload[0].currentProcessRole = 'Dean';
    } else if (workload[0].currentProcessRole === 'Dean') {
      workload[0].currentProcessRole = 'OVPAA';
    }
    return await strategicFunctionWorkloadRepository.save(workload);
  }

  public async ovpaaApproveWorkload(remarks: RemarksAndPoints) {
    const workload = await strategicFunctionWorkloadRepository.findOneBy({
      id: remarks.key,
    });
    workload.status = 'approved';
    workload.currentProcessRole = '';
    workload.remarks = remarks;
    return await strategicFunctionWorkloadRepository.save(workload);
  }

  public async getWorkloadRemarksFaculty(userId: string) {
    const workloadRemarks = await strategicFunctionWorkloadRepository
      .createQueryBuilder('strategic-function-workload')
      .where('strategic-function-workload.status = :status', {
        status: 'remarks',
      })
      .andWhere('strategic-function-workload.userID = :userId', {
        userId,
      })
      .getMany();
    const data = [];
    const user = await userRepository.findOneBy({
      id: userId,
    });
    for (let i = 0; workloadRemarks.length > i; i++) {
      user.approvedUniversityDesignationFilePath =
        workloadRemarks[i].approvedUniversityDesignationFilePath;
      user.approvedCollegeCampusDesignationFilePath =
        workloadRemarks[i].approvedCollegeCampusDesignationFilePath;
      user.approvedDepartmentDesignationFilePath =
        workloadRemarks[i].approvedDepartmentDesignationFilePath;
      user.listOfAdviseesFilePath = workloadRemarks[i].academicAdviseesFilePath;
      user.workloadId = workloadRemarks[i].id;
      data.push(user);
    }
    return data;
  }

  public async getAllPendingWorkload(email: string) {
    const user = await userRepository.findOneBy({ email: email });
    const strategicWorkload = await strategicFunctionWorkloadRepository.findBy({
      userID: user.id,
    });
    return strategicWorkload;
  }

  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    userId: string,
    currentProcessRole: string,
  ) {
    const strategicFunctionWorkload =
      await strategicFunctionWorkloadRepository.findBy({
        userID: userId,
        currentProcessRole: currentProcessRole,
      });
    return strategicFunctionWorkload;
  }

  public async getSavedWorkload(
    userId: string,
  ): Promise<StrategicFunctionWorkload> {
    return await strategicFunctionWorkloadRepository.findOneBy({
      userID: userId,
      isSubmitted: false,
    });
  }

  public async submitWorkload(id: string) {
    const workload = await strategicFunctionWorkloadRepository.findOneBy({
      id,
    });
    workload.isSubmitted = true;
    return await strategicFunctionWorkloadRepository.save(workload);
  }
}
