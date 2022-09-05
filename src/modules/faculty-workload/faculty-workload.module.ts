import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionWorkloadController } from './controller/extension-workload.controller';
import { ResearchWorkloadController } from './controller/research-workload.controller';
import { TeachingWorkloadController } from './controller/teaching-workload.controller';
import { ExtensionWorkload } from './entities/extension-workload.entity';
import { ResearchWorkload } from './entities/research-workload.entity';
import { TeachingWorkload } from './entities/teaching-workload.entity';
import { ExtensionWorkloadService } from './services/extension-workload.service';
import { ResearchWorkloadService } from './services/research-workload.service';
import { TeachingWorkloadService } from './services/teaching-workload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeachingWorkload,
      ResearchWorkload,
      ExtensionWorkload,
    ]),
  ],
  controllers: [
    TeachingWorkloadController,
    ResearchWorkloadController,
    ExtensionWorkloadController,
  ],
  providers: [
    TeachingWorkloadService,
    ResearchWorkloadService,
    ExtensionWorkloadService,
  ],
  exports: [],
})
export class FacultyWorkloadModule {}
