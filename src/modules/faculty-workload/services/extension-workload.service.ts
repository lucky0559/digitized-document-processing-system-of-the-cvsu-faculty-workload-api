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

if (!AppDataSource.isInitialized) {
  AppDataSource.initialize();
}

@Injectable()
export class ExtensionWorkloadService {
  public async saveExtensionWorkload(
    extensionWorkload: ExtensionWorkload,
    userId: string,
  ) {
    extensionWorkload.userID = userId;
    extensionWorkload.status = 'pending';
    extensionWorkload.currentProcessRole = 'Department Chairperson';
    await extensionWorkloadRepository.save(extensionWorkload);
    return AppDataSource.destroy();
  }

  public async getAllPendingExtensionWorkloadDC(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
    const pendingExtensionWorkloads = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'pending' })
      .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Department Chairperson',
      })
      .andWhere('extension-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
        .andWhere('user.department = :department', {
          department: reviewee.department,
        })
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
    AppDataSource.destroy();
    return data;
  }

  public async getAllPendingExtensionWorkloadDean(userId: string) {
    const reviewee = await userRepository.findOneBy({
      id: userId,
    });
    const pendingExtensionWorkloads = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'pending' })
      .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'Dean',
      })
      .andWhere('extension-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
      })
      .getMany();
    const data = [];
    for (let i = 0; pendingExtensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: pendingExtensionWorkloads[i].userID })
        .andWhere('user.campus = :campus', {
          campus: reviewee.campus,
        })
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
    AppDataSource.destroy();
    return data;
  }

  public async getAllPendingExtensionWorkloadOVPAA() {
    const pendingExtensionWorkloads = await extensionWorkloadRepository
      .createQueryBuilder('extension-workload')
      .where('extension-workload.status = :status', { status: 'pending' })
      .andWhere('extension-workload.currentProcessRole = :currentProcessRole', {
        currentProcessRole: 'OVPAA',
      })
      .andWhere('extension-workload.isSubmitted = :isSubmitted', {
        isSubmitted: true,
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
    AppDataSource.destroy();
    return data.reduce((group, workload) => {
      const { campus } = workload;
      group[campus] = group[campus] ?? [];
      group[campus].push(workload);
      return group;
    }, {});
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
    await extensionWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

  public async ovpaaApproveWorkload(
    remarks: RemarksAndPoints,
    role: string,
    deanPoints?: any,
  ) {
    const workload = await extensionWorkloadRepository.findOneBy({
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
    await extensionWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }

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
    AppDataSource.destroy();
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
    const users: User[] = [];
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
    const filtered: User[] = users.filter((element) => {
      const isDuplicate = filteredUsers.includes(element.id);

      if (!isDuplicate) {
        filteredUsers.push(element.id);
        return true;
      }
      return false;
    });

    const setter = filtered;
    for (let b = 0; setter.length > b; b++) {
      for (let c = 0; teachingWorkloads.length > c; c++) {
        if (setter[b].id === teachingWorkloads[c]?.userID) {
          setter[b].twlPoints = Number(teachingWorkloads[c].remarks.points);
          setter[b].remarks = teachingWorkloads[c].remarks.remarks;
          setter[b].initialTwlPoints =
            teachingWorkloads[c].totalTeachingWorkload;
        }
      }
      for (let d = 0; researchWorkloads.length > d; d++) {
        if (setter[b].id === researchWorkloads[d]?.userID) {
          setter[b].rwlPoints = Number(researchWorkloads[d].remarks.points);
          setter[b].remarks = researchWorkloads[d].remarks.remarks;
          setter[b].initialRwlPoints = researchWorkloads[d].rwlPoints;
        }
      }

      if (!!extensionWorkloads.length) {
        for (let e = 0; setter.length > e; e++) {
          if (setter[b].id === extensionWorkloads[e]?.userID) {
            setter[b].ewlPoints = Number(extensionWorkloads[e].remarks.points);
            setter[b].remarks = extensionWorkloads[e].remarks.remarks;
            setter[b].initialEwlPoints = extensionWorkloads[e].ewlPoints;
          }
        }
      }

      if (!!strategicWorkloads.length) {
        for (let f = 0; setter.length > f; f++) {
          if (setter[b].id === strategicWorkloads[f]?.userID) {
            setter[b].sfwPoints = Number(strategicWorkloads[f].remarks.points);
            setter[b].initialSfwPoints = strategicWorkloads[f].sfwPoints;
          }
        }
      }
    }
    AppDataSource.destroy();
    return setter.reduce((group, user) => {
      const { campus } = user;
      group[campus] = group[campus] ?? [];
      group[campus].push(user);
      return group;
    }, {});
  }

  public async getAllTotalWorkloadDeanDeptPointsApproved(
    role: string,
    campus: string,
    department: string,
  ) {
    let extensionWorkloads: ExtensionWorkload[],
      researchWorkloads: ResearchWorkload[],
      strategicWorkloads: StrategicFunctionWorkload[],
      teachingWorkloads: TeachingWorkload[];
    if (role === 'Department Chairperson') {
      extensionWorkloads = await extensionWorkloadRepository
        .createQueryBuilder('extension-workload')
        .where('extension-workload.currentProcessRole != :currentProcessRole', {
          currentProcessRole: role,
        })
        .getMany();
      researchWorkloads = await researchWorkloadRepository
        .createQueryBuilder('research-workload')
        .where('research-workload.currentProcessRole != :currentProcessRole', {
          currentProcessRole: role,
        })
        .getMany();
      strategicWorkloads = await strategicWorkloadRepository
        .createQueryBuilder('strategic-function-workload')
        .where(
          'strategic-function-workload.currentProcessRole != :currentProcessRole',
          {
            currentProcessRole: role,
          },
        )
        .getMany();
      teachingWorkloads = await teachingWorkloadRepository
        .createQueryBuilder('teaching-workload')
        .where('teaching-workload.currentProcessRole != :currentProcessRole', {
          currentProcessRole: role,
        })
        .getMany();
    } else {
      extensionWorkloads = await extensionWorkloadRepository.find({
        where: {
          currentProcessRole: 'OVPAA' || '',
        },
      });
      researchWorkloads = await researchWorkloadRepository.find({
        where: {
          currentProcessRole: 'OVPAA' || '',
        },
      });
      strategicWorkloads = await strategicWorkloadRepository.find({
        where: {
          currentProcessRole: 'OVPAA' || '',
        },
      });
      teachingWorkloads = await teachingWorkloadRepository.find({
        where: {
          currentProcessRole: 'OVPAA' || '',
        },
      });
    }

    const users: User[] = [];
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
    AppDataSource.destroy();
    const filtered: User[] = users.filter((element) => {
      const isDuplicate = filteredUsers.includes(element.id);

      if (!isDuplicate) {
        filteredUsers.push(element.id);
        return true;
      }
      return false;
    });

    const setter = filtered;
    for (let b = 0; setter.length > b; b++) {
      for (let c = 0; teachingWorkloads.length > c; c++) {
        if (setter[b].id === teachingWorkloads[c]?.userID) {
          if (teachingWorkloads[c].currentProcessRole) {
            setter[b].initialTwlPoints =
              teachingWorkloads[c].totalTeachingWorkload;
          } else {
            setter[b].twlPoints = Number(teachingWorkloads[c].remarks.points);
            setter[b].remarks = teachingWorkloads[c].remarks.remarks;
            setter[b].initialTwlPoints =
              teachingWorkloads[c].totalTeachingWorkload;
          }
        }
      }
      for (let d = 0; researchWorkloads.length > d; d++) {
        if (setter[b].id === researchWorkloads[d]?.userID) {
          if (researchWorkloads[d].currentProcessRole) {
            setter[b].initialRwlPoints = researchWorkloads[d].rwlPoints;
          } else {
            setter[b].rwlPoints = Number(researchWorkloads[d].remarks.points);
            setter[b].remarks = researchWorkloads[d].remarks.remarks;
            setter[b].initialRwlPoints = researchWorkloads[d].rwlPoints;
          }
        }
      }

      if (!!extensionWorkloads.length) {
        for (let e = 0; setter.length > e; e++) {
          if (setter[b].id === extensionWorkloads[e]?.userID) {
            if (extensionWorkloads[e].currentProcessRole) {
              setter[b].initialEwlPoints = extensionWorkloads[e].ewlPoints;
            } else {
              setter[b].ewlPoints = Number(
                extensionWorkloads[e].remarks.points,
              );
              setter[b].remarks = extensionWorkloads[e].remarks.remarks;
              setter[b].initialEwlPoints = extensionWorkloads[e].ewlPoints;
            }
          }
        }
      }

      if (!!strategicWorkloads.length) {
        for (let f = 0; setter.length > f; f++) {
          if (setter[b].id === strategicWorkloads[f]?.userID) {
            if (strategicWorkloads[f].currentProcessRole) {
              setter[b].initialSfwPoints = strategicWorkloads[f].sfwPoints;
            } else {
              setter[b].sfwPoints = Number(
                strategicWorkloads[f].remarks.points,
              );
              setter[b].initialSfwPoints = strategicWorkloads[f].sfwPoints;
            }
          }
        }
      }
    }
    if (role === 'Department Chairperson') {
      const filteredSetter = setter.filter((item) => {
        return item.campus === campus && item.department === department;
      });
      return filteredSetter;
    } else {
      const filteredSetter = setter.filter((item) => {
        return item.campus === campus;
      });
      return filteredSetter;
    }
  }

  public async getAllPendingWorkload(email: string) {
    const user = await userRepository.findOneBy({ email: email });
    const extensionWorkload = await extensionWorkloadRepository.findBy({
      userID: user.id,
    });
    AppDataSource.destroy();
    return extensionWorkload;
  }

  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    userId: string,
    currentProcessRole: string,
  ) {
    const extensionWorkload = await extensionWorkloadRepository.findBy({
      userID: userId,
      currentProcessRole: currentProcessRole,
    });
    AppDataSource.destroy();
    return extensionWorkload;
  }

  public async getSavedWorkload(userId: string) {
    const data = await extensionWorkloadRepository.findOneBy({
      userID: userId,
      isSubmitted: false,
    });
    AppDataSource.destroy();
    return data;
  }

  public async submitWorkload(id: string) {
    const workload = await extensionWorkloadRepository.findOneBy({ id });
    workload.isSubmitted = true;
    await extensionWorkloadRepository.save(workload);
    return AppDataSource.destroy();
  }
}
