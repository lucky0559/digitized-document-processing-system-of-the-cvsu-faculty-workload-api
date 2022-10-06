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

  public async getAllStrategicWorkload() {
    const strategicWorkloads = await strategicFunctionWorkloadRepository.find();
    const data = [];
    for (let i = 0; strategicWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: strategicWorkloads[i].userID })
        .getOne();
      user.approvedUniversityDesignationFilePath =
        strategicWorkloads[i].approvedUniversityDesignationFilePath;
      user.approvedCollegeCampusDesignationFilePath =
        strategicWorkloads[i].approvedCollegeCampusDesignationFilePath;
      user.approvedDepartmentDesignationFilePath =
        strategicWorkloads[i].approvedDepartmentDesignationFilePath;
      user.coachAdviserCertificateFilePath =
        strategicWorkloads[i].coachAdviserCertificateFilePath;
      user.approvedDesignationFilePath =
        strategicWorkloads[i].approvedDesignationFilePath;
      user.listOfAdviseesFilePath =
        strategicWorkloads[i].listOfAdviseesFilePath;
      data.push(user);
    }

    return data;
  }
}
