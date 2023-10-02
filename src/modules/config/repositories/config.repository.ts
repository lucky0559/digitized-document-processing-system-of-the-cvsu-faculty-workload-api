import { Repository } from 'typeorm';
import { CustomRepository } from '../../../database/typeorm-ex.decorator';
import { Config } from '../entities/config.entity';

@CustomRepository(Config)
export class ConfigRepository extends Repository<Config> {}
