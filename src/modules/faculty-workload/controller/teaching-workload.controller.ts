import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TeachingWorkloadService } from '../services/teaching-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

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

  @Patch('ovpaa-approve-workload')
  public async ovpaaApproveWorkload(@Body() remarks: RemarksAndPoints) {
    return this.teachingWorkloadService.ovpaaApproveWorkload(remarks);
  }

  // @Patch(':workloadId/:remarks/remarks-workload')
  // public async remarksWorkload(
  //   @Param('workloadId') workloadId: string,
  //   @Param('remarks') remarks: string,
  // ) {
  //   return this.teachingWorkloadService.remarksWorkload(workloadId, remarks);
  // }

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
}
