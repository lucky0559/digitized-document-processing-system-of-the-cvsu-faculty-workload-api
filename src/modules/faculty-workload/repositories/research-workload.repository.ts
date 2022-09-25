import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { ResearchWorkload } from '../entities/research-workload.entity';

@CustomRepository(ResearchWorkload)
export class ResearchWorkloadRepository extends Repository<ResearchWorkload> {}
