import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('all-extension-workload')
  public async getAllExtensionWorkload() {
    return this.extensionWorkloadService.getAllExtensionWorkload();
  }
}
