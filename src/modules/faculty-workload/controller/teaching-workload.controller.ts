import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TeachingWorkloadService } from '../services/teaching-workload.service';
import {
  RemarksAndPoints,
  TeachingWorkload,
} from '../entities/teaching-workload.entity';
import { OVPAAApprove } from '../entities/faculty-workload.entity';

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

  @Get(':userId/all-pending-teaching-workload-dc')
  public async getAllPendingTeachingWorkloadDC(
    @Param('userId') userId: string,
  ) {
    return this.teachingWorkloadService.getAllPendingTeachingWorkloadDC(userId);
  }

  @Get(':userId/all-pending-teaching-workload-dean')
  public async getAllPendingTeachingWorkloadDean(
    @Param('userId') userId: string,
  ) {
    return this.teachingWorkloadService.getAllPendingTeachingWorkloadDean(
      userId,
    );
  }

  @Get('all-pending-teaching-workload-ovpaa')
  public async getAllPendingTeachingWorkloadOVPAA() {
    return this.teachingWorkloadService.getAllPendingTeachingWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.teachingWorkloadService.approveWorkload(workloadId);
  }

  @Patch(':role/ovpaa-approve-workload')
  public async ovpaaApproveWorkload(
    @Body() body: OVPAAApprove,
    @Param('role') role: string,
  ) {
    return this.teachingWorkloadService.ovpaaApproveWorkload(
      body.remarks,
      role,
      body.deanPoints,
    );
  }

  @Get(':userId/workload-remarks')
  public async getWorkloadRemarksFaculty(@Param('userId') userId: string) {
    return this.teachingWorkloadService.getWorkloadRemarksFaculty(userId);
  }

  @Get(':email/all-pending-workloads')
  public async getAllPendingWorkload(@Param('email') email: string) {
    return this.teachingWorkloadService.getAllPendingWorkload(email);
  }

  @Get(':userId/:currentProcessRole/all-pending-by-process-role')
  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    @Param('userId') userId: string,
    @Param('currentProcessRole') currentProcessRole: string,
  ) {
    return this.teachingWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(
      userId,
      currentProcessRole,
    );
  }

  @Get(':userId/getSavedWorkload')
  public async getSavedWorkload(
    @Param('userId') userId: string,
  ): Promise<TeachingWorkload> {
    return this.teachingWorkloadService.getSavedWorkload(userId);
  }

  @Patch(':id/submit-workload')
  public async submitWorkload(@Param('id') id: string) {
    return this.teachingWorkloadService.submitWorkload(id);
  }
}
