import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchWorkloadController } from './controller/research-workload.controller';
import { TeachingWorkloadController } from './controller/teaching-workload.controller';
import { ResearchWorkload } from './entities/research-workload.entity';
import { TeachingWorkload } from './entities/teaching-workload.entity';
import { ResearchWorkloadService } from './services/research-workload.service';
import { TeachingWorkloadService } from './services/teaching-workload.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeachingWorkload, ResearchWorkload])],
  controllers: [TeachingWorkloadController, ResearchWorkloadController],
  providers: [TeachingWorkloadService, ResearchWorkloadService],
  exports: [],
})
export class FacultyWorkloadModule {}
