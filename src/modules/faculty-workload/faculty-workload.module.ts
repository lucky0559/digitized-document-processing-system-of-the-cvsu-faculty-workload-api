import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionWorkloadController } from './controller/extension-workload.controller';
import { ResearchWorkloadController } from './controller/research-workload.controller';
import { StrategicFunctionWorkloadController } from './controller/strategic-function-workload.controller';
import { TeachingWorkloadController } from './controller/teaching-workload.controller';
import { ExtensionWorkload } from './entities/extension-workload.entity';
import { ResearchWorkload } from './entities/research-workload.entity';
import { StrategicFunctionWorkload } from './entities/strategic-function-workload.entity';
import { TeachingWorkload } from './entities/teaching-workload.entity';
import { ExtensionWorkloadService } from './services/extension-workload.service';
import { ResearchWorkloadService } from './services/research-workload.service';
import { StrategicFunctionWorkloadService } from './services/strategic-function-workload.service';
import { TeachingWorkloadService } from './services/teaching-workload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeachingWorkload,
      ResearchWorkload,
      ExtensionWorkload,
      StrategicFunctionWorkload,
    ]),
  ],
  controllers: [
    TeachingWorkloadController,
    ResearchWorkloadController,
    ExtensionWorkloadController,
    StrategicFunctionWorkloadController,
  ],
  providers: [
    TeachingWorkloadService,
    ResearchWorkloadService,
    ExtensionWorkloadService,
    StrategicFunctionWorkloadService,
  ],
  exports: [],
})
export class FacultyWorkloadModule {}
