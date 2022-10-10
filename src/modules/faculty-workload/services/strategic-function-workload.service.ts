import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';

const strategicFunctionWorkloadRepository = AppDataSource.getRepository(
  StrategicFunctionWorkload,
);
const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class StrategicFunctionWorkloadService {
  public async saveStrategicFunctinWorkload(
    strategicFunctionWorkload: StrategicFunctionWorkload,
    userId: string,
  ) {
    strategicFunctionWorkload.userID = userId;
    return await strategicFunctionWorkloadRepository.save(
      strategicFunctionWorkload,
    );
  }

  public async getAllPendingStrategicWorkloadDC() {
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
      .getMany();
    const data = [];
    for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
        .getOne();
      user.approvedUniversityDesignationFilePath =
        pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
      user.approvedCollegeCampusDesignationFilePath =
        pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
      user.approvedDepartmentDesignationFilePath =
        pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
      user.coachAdviserCertificateFilePath =
        pendingStrategicWorkloads[i].coachAdviserCertificateFilePath;
      user.approvedDesignationFilePath =
        pendingStrategicWorkloads[i].approvedDesignationFilePath;
      user.listOfAdviseesFilePath =
        pendingStrategicWorkloads[i].listOfAdviseesFilePath;
      user.workloadId = pendingStrategicWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async getAllPendingStrategicWorkloadDean() {
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
      .getMany();
    const data = [];
    for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
        .getOne();
      user.approvedUniversityDesignationFilePath =
        pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
      user.approvedCollegeCampusDesignationFilePath =
        pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
      user.approvedDepartmentDesignationFilePath =
        pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
      user.coachAdviserCertificateFilePath =
        pendingStrategicWorkloads[i].coachAdviserCertificateFilePath;
      user.approvedDesignationFilePath =
        pendingStrategicWorkloads[i].approvedDesignationFilePath;
      user.listOfAdviseesFilePath =
        pendingStrategicWorkloads[i].listOfAdviseesFilePath;
      user.workloadId = pendingStrategicWorkloads[i].id;
      data.push(user);
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
      .getMany();
    const data = [];
    for (let i = 0; pendingStrategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingStrategicWorkloads[i].userID })
        .getOne();
      user.approvedUniversityDesignationFilePath =
        pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
      user.approvedCollegeCampusDesignationFilePath =
        pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
      user.approvedDepartmentDesignationFilePath =
        pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
      user.coachAdviserCertificateFilePath =
        pendingStrategicWorkloads[i].coachAdviserCertificateFilePath;
      user.approvedDesignationFilePath =
        pendingStrategicWorkloads[i].approvedDesignationFilePath;
      user.listOfAdviseesFilePath =
        pendingStrategicWorkloads[i].listOfAdviseesFilePath;
      user.workloadId = pendingStrategicWorkloads[i].id;
      data.push(user);
    }

    return data;
  }

  public async approveWorkload(workloadId: string) {
    const workload = await strategicFunctionWorkloadRepository.findBy({
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
    return await strategicFunctionWorkloadRepository.save(workload);
  }
}
