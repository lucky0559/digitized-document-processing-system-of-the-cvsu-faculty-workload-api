import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';

const strategicFunctionWorkloadRepository = AppDataSource.getRepository(
  StrategicFunctionWorkload,
);

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
}
