import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ResearchWorkloadService } from '../services/research-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
import { ResearchWorkload } from '../entities/research-workload.entity';

@Controller('/research-workload')
export class ResearchWorkloadController {
  constructor(
    private readonly researchWorkloadService: ResearchWorkloadService,
  ) {}

  @Get()
  public async research() {
    return 'research-workload';
  }

  @Post(':userId/save')
  public async saveResearchWorkload(
    @Param('userId') userId: string,
    @Body() researchWorkload: any,
  ) {
    return this.researchWorkloadService.saveResearchWorkload(
      researchWorkload,
      userId,
    );
  }

  @Get(':userId/all-pending-research-workload-dc')
  public async getAllPendingResearchWorkloadDC(
    @Param('userId') userId: string,
  ) {
    return this.researchWorkloadService.getAllPendingResearchWorkloadDC(userId);
  }

  @Get(':userId/all-pending-research-workload-dean')
  public async getAllPendingResearchWorkloadDean(
    @Param('userId') userId: string,
  ) {
    return this.researchWorkloadService.getAllPendingResearchWorkloadDean(
      userId,
    );
  }

  @Get('all-pending-research-workload-ovpaa')
  public async getAllPendingResearchWorkloadOVPAA() {
    return this.researchWorkloadService.getAllPendingResearchWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.researchWorkloadService.approveWorkload(workloadId);
  }

  @Patch('ovpaa-approve-workload')
  public async ovpaaApproveWorkload(@Body() remarks: RemarksAndPoints) {
    return this.researchWorkloadService.ovpaaApproveWorkload(remarks);
  }

  @Get(':userId/workload-remarks')
  public async getWorkloadRemarksFaculty(@Param('userId') userId: string) {
    return this.researchWorkloadService.getWorkloadRemarksFaculty(userId);
  }

  @Get(':email/all-pending-workloads')
  public async getAllPendingWorkload(@Param('email') email: string) {
    return this.researchWorkloadService.getAllPendingWorkload(email);
  }

  @Get(':userId/:currentProcessRole/all-pending-by-process-role')
  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    @Param('userId') userId: string,
    @Param('currentProcessRole') currentProcessRole: string,
  ) {
    return this.researchWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(
      userId,
      currentProcessRole,
    );
  }

  @Get(':userId/getSavedWorkload')
  public async getSavedWorkload(
    @Param('userId') userId: string,
  ): Promise<ResearchWorkload> {
    return this.researchWorkloadService.getSavedWorkload(userId);
  }

  @Patch(':id/submit-workload')
  public async submitWorkload(@Param('id') id: string) {
    return this.researchWorkloadService.submitWorkload(id);
  }
}
