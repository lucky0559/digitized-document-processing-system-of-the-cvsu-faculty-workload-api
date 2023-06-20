import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';
import { config } from '../../../../config';
import { google } from 'googleapis';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

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
    strategicFunctionWorkload.status = 'pending';
    strategicFunctionWorkload.currentProcessRole = 'Department Chairperson';
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
      if (user) {
        user.approvedUniversityDesignationFilePath =
          pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
        user.approvedCollegeCampusDesignationFilePath =
          pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
        user.approvedDepartmentDesignationFilePath =
          pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
        // user.coachAdviserCertificateFilePath =
        //   pendingStrategicWorkloads[i].coachAdviserCertificateFilePath;
        // user.approvedDesignationFilePath =
        //   pendingStrategicWorkloads[i].approvedDesignationFilePath;
        user.listOfAdviseesFilePath =
          pendingStrategicWorkloads[i].academicAdviseesFilePath;
        user.workloadId = pendingStrategicWorkloads[i].id;
        data.push(user);
      }
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
      if (user) {
        user.approvedUniversityDesignationFilePath =
          pendingStrategicWorkloads[i].approvedUniversityDesignationFilePath;
        user.approvedCollegeCampusDesignationFilePath =
          pendingStrategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
        user.approvedDepartmentDesignationFilePath =
          pendingStrategicWorkloads[i].approvedDepartmentDesignationFilePath;
        // user.coachAdviserCertificateFilePath =
        //   pendingStrategicWorkloads[i].coachAdviserCertificateFilePath;
        // user.approvedDesignationFilePath =
        //   pendingStrategicWorkloads[i].approvedDesignationFilePath;
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
        // user.coachAdviserCertificateFilePath =
        //   pendingStrategicWorkloads[i].coachAdviserCertificateFilePath;
        // user.approvedDesignationFilePath =
        //   pendingStrategicWorkloads[i].approvedDesignationFilePath;
        user.listOfAdviseesFilePath =
          pendingStrategicWorkloads[i].academicAdviseesFilePath;
        user.workloadId = pendingStrategicWorkloads[i].id;
        data.push(user);
      }
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
    }
    return await strategicFunctionWorkloadRepository.save(workload);
  }

  public async ovpaaApproveWorkload(remarks: RemarksAndPoints) {
    const workload = await strategicFunctionWorkloadRepository.findBy({
      id: remarks.key,
    });
    workload[0].status = 'approved';
    workload[0].currentProcessRole = '';
    workload[0].remarks = remarks;
    return await strategicFunctionWorkloadRepository.save(workload);
  }

  // public async remarksWorkload(workloadId: string, remarks: string) {
  //   const workload = await strategicFunctionWorkloadRepository.findBy({
  //     id: workloadId,
  //   });
  //   workload[0].remarks = remarks;
  //   workload[0].status = 'remarks';
  //   return await strategicFunctionWorkloadRepository.save(workload);
  // }

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
      // user.coachAdviserCertificateFilePath =
      //   workloadRemarks[i].coachAdviserCertificateFilePath;
      // user.approvedDesignationFilePath =
      //   workloadRemarks[i].approvedDesignationFilePath;
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
      status: 'pending',
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
}
