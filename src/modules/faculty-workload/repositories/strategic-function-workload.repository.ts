import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';

@CustomRepository(StrategicFunctionWorkload)
export class StrategicFunctionWorkloadRepository extends Repository<StrategicFunctionWorkload> {}
