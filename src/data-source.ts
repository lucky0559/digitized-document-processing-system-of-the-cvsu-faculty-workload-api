import { DataSource } from 'typeorm';
import { Profile } from './modules/user/entities/profile.entity';
import { User } from './modules/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
  port: 5432,
  username: 'utkffh2rjuun7a9wtwrc',
  password: 'Pwk4J1mjiVCxsXzA2CCP',
  database: 'bk6v1mavp0s8wdc05wtd',
  entities: [Profile, User],
  synchronize: true,
});

AppDataSource.initialize();
