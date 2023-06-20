import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ExtensionWorkloadService } from '../services/extension-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

@Controller('/extension-workload')
export class ExtensionWorkloadController {
  constructor(
    private readonly extensionWorkloadService: ExtensionWorkloadService,
  ) {}

  @Get()
  public async extension() {
    return 'extension-workload';
  }

  @Post(':userId/save')
  public async saveExtensionWorkload(
    @Param('userId') userId: string,
    @Body() extensionWorkload: any,
  ) {
    return this.extensionWorkloadService.saveExtensionWorkload(
      extensionWorkload,
      userId,
    );
  }

  @Get('all-pending-extension-workload-dc')
  public async getAllPendingExtensionWorkloadDC() {
    return this.extensionWorkloadService.getAllPendingExtensionWorkloadDC();
  }

  @Get('all-pending-extension-workload-dean')
  public async getAllPendingExtensionWorkloadDean() {
    return this.extensionWorkloadService.getAllPendingExtensionWorkloadDean();
  }

  @Get('all-pending-extension-workload-ovpaa')
  public async getAllPendingExtensionWorkloadOVPAA() {
    return this.extensionWorkloadService.getAllPendingExtensionWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.extensionWorkloadService.approveWorkload(workloadId);
  }

  @Patch(':remarks/ovpaa-approve-workload')
  public async ovpaaApproveWorkload(
    @Param('remarks') remarks: RemarksAndPoints,
  ) {
    return this.extensionWorkloadService.ovpaaApproveWorkload(remarks);
  }

  // @Patch(':workloadId/:remarks/remarks-workload')
  // public async remarksWorkload(
  //   @Param('workloadId') workloadId: string,
  //   @Param('remarks') remarks: string,
  // ) {
  //   return this.extensionWorkloadService.remarksWorkload(workloadId, remarks);
  // }

  // @Get(':userId/workload-remarks')
  // public async getWorkloadRemarksFaculty(@Param('userId') userId: string) {
  //   return this.extensionWorkloadService.getWorkloadRemarksFaculty(userId);
  // }

  @Get('workloads-approved')
  public async getAllTotalWorkloadPointsApproved() {
    return this.extensionWorkloadService.getAllTotalWorkloadPointsApproved();
  }

  @Get(':email/all-pending-workloads')
  public async getAllPendingWorkload(@Param('email') email: string) {
    return this.extensionWorkloadService.getAllPendingWorkload(email);
  }

  @Get(':userId/:currentProcessRole/all-pending-by-process-role')
  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    @Param('userId') userId: string,
    @Param('currentProcessRole') currentProcessRole: string,
  ) {
    return this.extensionWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(
      userId,
      currentProcessRole,
    );
  }
}
