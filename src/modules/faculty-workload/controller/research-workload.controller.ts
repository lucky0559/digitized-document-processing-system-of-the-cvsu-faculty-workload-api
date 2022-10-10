import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ResearchWorkloadService } from '../services/research-workload.service';

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

  @Get('all-pending-research-workload-dc')
  public async getAllPendingResearchWorkloadDC() {
    return this.researchWorkloadService.getAllPendingResearchWorkloadDC();
  }

  @Get('all-pending-research-workload-dean')
  public async getAllPendingResearchWorkloadDean() {
    return this.researchWorkloadService.getAllPendingResearchWorkloadDean();
  }

  @Get('all-pending-research-workload-ovpaa')
  public async getAllPendingResearchWorkloadOVPAA() {
    return this.researchWorkloadService.getAllPendingResearchWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.researchWorkloadService.approveWorkload(workloadId);
  }

  @Patch(':workloadId/:remarks/remarks-workload')
  public async remarksWorkload(
    @Param('workloadId') workloadId: string,
    @Param('remarks') remarks: string,
  ) {
    return this.researchWorkloadService.remarksWorkload(workloadId, remarks);
  }
}
