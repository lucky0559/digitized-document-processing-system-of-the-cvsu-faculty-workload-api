import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { UserRepository } from './modules/user/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyWorkloadModule } from './modules/faculty-workload/faculty-workload.module';
import { TeachingWorkloadRepository } from './modules/faculty-workload/repositories/teaching-workload.repository';
import { ResearchWorkloadRepository } from './modules/faculty-workload/repositories/research-workload.repository';
import { ExtensionWorkloadRepository } from './modules/faculty-workload/repositories/extension-workload.repository';
import { ConfigRepository } from './modules/config/repositories/config.repository';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
      port: 5432,
      username: 'utkffh2rjuun7a9wtwrc',
      password: 'Pwk4J1mjiVCxsXzA2CCP',
      database: 'bk6v1mavp0s8wdc05wtd',
      entities: [`__dirname + '/../**/*.entity.js'`],
      synchronize: true,
    }),
    UserModule,
    FacultyWorkloadModule,
    ConfigModule,
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      TeachingWorkloadRepository,
      ResearchWorkloadRepository,
      ExtensionWorkloadRepository,
      ConfigRepository,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
