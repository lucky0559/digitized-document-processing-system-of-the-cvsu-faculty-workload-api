import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { TeachingWorkload } from '../entities/teaching-workload.entity';

@CustomRepository(TeachingWorkload)
export class TeachingWorkloadRepository extends Repository<TeachingWorkload> {}
