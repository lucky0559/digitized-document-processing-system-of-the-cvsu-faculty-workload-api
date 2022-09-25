import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeachingWorkloadService } from '../services/teaching-workload.service';

@Controller('/teaching-workload')
export class TeachingWorkloadController {
  constructor(
    private readonly teachingWorkloadService: TeachingWorkloadService,
  ) {}

  @Get()
  public async teach() {
    return 'teaching-workload';
  }

  @Post(':userId/save')
  public async saveTeachingWorkload(
    @Param('userId') userId: string,
    @Body() teachingWorkload: any,
  ) {
    return this.teachingWorkloadService.saveTeachingWorkload(
      teachingWorkload,
      userId,
    );
  }
}
