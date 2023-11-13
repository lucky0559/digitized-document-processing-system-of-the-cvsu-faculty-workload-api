import { DataSource } from 'typeorm';
import { ExtensionWorkload } from './modules/faculty-workload/entities/extension-workload.entity';
import { ResearchWorkload } from './modules/faculty-workload/entities/research-workload.entity';
import { StrategicFunctionWorkload } from './modules/faculty-workload/entities/strategic-function-workload.entity';
import { TeachingWorkload } from './modules/faculty-workload/entities/teaching-workload.entity';
import { ESignature } from './modules/user/entities/e-signature.entity';
import { User } from './modules/user/entities/user.entity';
import { Config } from './modules/config/entities/config.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'bfc5pjhogvnsdqiyu5kc-postgresql.services.clever-cloud.com',
  port: 50013,
  username: 'utkffh2rjuun7a9wtwrc',
  password: 'Pwk4J1mjiVCxsXzA2CCP',
  database: 'bfc5pjhogvnsdqiyu5kc',
  entities: [
    User,
    TeachingWorkload,
    ResearchWorkload,
    ExtensionWorkload,
    StrategicFunctionWorkload,
    ESignature,
    Config,
  ],
  synchronize: true,
});

// AppDataSource.initialize();
// AppDataSource.destroy();
