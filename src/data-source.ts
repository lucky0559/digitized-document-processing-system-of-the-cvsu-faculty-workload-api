import { DataSource } from 'typeorm';
import { ExtensionWorkload } from './modules/faculty-workload/entities/extension-workload.entity';
import { ResearchWorkload } from './modules/faculty-workload/entities/research-workload.entity';
import { StrategicFunctionWorkload } from './modules/faculty-workload/entities/strategic-function-workload.entity';
import { TeachingWorkload } from './modules/faculty-workload/entities/teaching-workload.entity';
import { ESignature } from './modules/user/entities/e-signature.entity';
import { User } from './modules/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
  port: 5432,
  username: 'utkffh2rjuun7a9wtwrc',
  password: 'Pwk4J1mjiVCxsXzA2CCP',
  database: 'bk6v1mavp0s8wdc05wtd',
  entities: [
    User,
    TeachingWorkload,
    ResearchWorkload,
    ExtensionWorkload,
    StrategicFunctionWorkload,
    ESignature,
  ],
  synchronize: true,
});

if (!AppDataSource.isInitialized) {
  AppDataSource.initialize();
}
