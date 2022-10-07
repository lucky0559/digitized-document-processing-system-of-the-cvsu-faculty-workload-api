import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('all-pending-teaching-workload-dc')
  public async getAllPendingTeachingWorkloadDC() {
    return this.teachingWorkloadService.getAllPendingTeachingWorkloadDC();
  }

  @Get('all-pending-teaching-workload-dean')
  public async getAllPendingTeachingWorkloadDean() {
    return this.teachingWorkloadService.getAllPendingTeachingWorkloadDean();
  }

  @Get('all-pending-teaching-workload-ovpaa')
  public async getAllPendingTeachingWorkloadOVPAA() {
    return this.teachingWorkloadService.getAllPendingTeachingWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.teachingWorkloadService.approveWorkload(workloadId);
  }
}
