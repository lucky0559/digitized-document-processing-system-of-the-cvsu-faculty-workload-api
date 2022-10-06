import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { User } from '../../user/entities/user.entity';
import { ExtensionWorkload } from '../entities/extension-workload.entity';

const extensionWorkloadRepository =
  AppDataSource.getRepository(ExtensionWorkload);
const userRepository = AppDataSource.getRepository(User);

@Injectable()
export class ExtensionWorkloadService {
  public async saveExtensionWorkload(
    extensionWorkload: ExtensionWorkload,
    userId: string,
  ) {
    extensionWorkload.userID = userId;
    return await extensionWorkloadRepository.save(extensionWorkload);
  }

  public async getAllExtensionWorkload() {
    const extensionWorkloads = await extensionWorkloadRepository.find();
    const data = [];
    for (let i = 0; extensionWorkloads.length > i; i++) {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: extensionWorkloads[i].userID })
        .getOne();
      user.extensionActivityFilePath =
        extensionWorkloads[i].extensionActivityFilePath;
      user.certificateFilePath = extensionWorkloads[i].certificateFilePath;
      user.summaryOfHoursFilePath =
        extensionWorkloads[i].summaryOfHoursFilePath;
      data.push(user);
    }

    return data;
  }
}
