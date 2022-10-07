import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ExtensionWorkloadService } from '../services/extension-workload.service';

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
}
