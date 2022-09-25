import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { ExtensionWorkload } from '../entities/extension-workload.entity';

const researchWorkloadRepository =
  AppDataSource.getRepository(ExtensionWorkload);

@Injectable()
export class ExtensionWorkloadService {
  public async saveExtensionWorkload(
    extensionWorkload: ExtensionWorkload,
    userId: string,
  ) {
    extensionWorkload.userID = userId;
    return await researchWorkloadRepository.save(extensionWorkload);
  }
}
