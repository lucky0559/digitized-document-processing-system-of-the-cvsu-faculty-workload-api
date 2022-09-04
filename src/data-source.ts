import { DataSource } from 'typeorm';
import { ResearchWorkload } from './modules/faculty-workload/entities/research-workload.entity';
import { TeachingWorkload } from './modules/faculty-workload/entities/teaching-workload.entity';
import { User } from './modules/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
  port: 5432,
  username: 'utkffh2rjuun7a9wtwrc',
  password: 'Pwk4J1mjiVCxsXzA2CCP',
  database: 'bk6v1mavp0s8wdc05wtd',
  entities: [User, TeachingWorkload, ResearchWorkload],
  synchronize: true,
});

AppDataSource.initialize();
