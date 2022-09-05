import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { ExtensionWorkload } from '../entities/extension-workload.entity';

@CustomRepository(ExtensionWorkload)
export class ExtensionWorkloadRepository extends Repository<ExtensionWorkload> {}
