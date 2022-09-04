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

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'bk6v1mavp0s8wdc05wtd-postgresql.services.clever-cloud.com',
        port: 5432,
        username: 'utkffh2rjuun7a9wtwrc',
        password: 'Pwk4J1mjiVCxsXzA2CCP',
        database: 'bk6v1mavp0s8wdc05wtd',
        entities: [`__dirname + '/../**/*.entity.js'`],
        synchronize: true,
      },
      // 'mongodb://ddps:SFKdWREM6Jorvvyk@cluster0.lddsl.mongodb.net/?retryWrites=true&w=majority',
      //'mongodb://ddps:SFKdWREM6Jorvvyk@cluster0-shard-00-00.lddsl.mongodb.net:27017,cluster0-shard-00-01.lddsl.mongodb.net:27017,cluster0-shard-00-02.lddsl.mongodb.net:27017/?ssl=true&replicaSet=atlas-vq40wb-shard-0&authSource=admin&retryWrites=true&w=majority',
    ),
    UserModule,
    FacultyWorkloadModule,
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      TeachingWorkloadRepository,
      ResearchWorkloadRepository,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
