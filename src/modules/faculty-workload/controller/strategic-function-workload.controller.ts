import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';

@Controller('/strategic-function-workload')
export class StrategicFunctionWorkloadController {
  constructor(
    private readonly strategicFunctionWorkloadService: StrategicFunctionWorkloadService,
  ) {}

  @Get()
  public async strategicFunction() {
    return 'strategic-function-workload';
  }

  @Post(':userId/save')
  public async saveTeachingWorkload(
    @Param('userId') userId: string,
    @Body() strategicFunctionWorkload: any,
  ) {
    return this.strategicFunctionWorkloadService.saveStrategicFunctinWorkload(
      strategicFunctionWorkload,
      userId,
    );
  }

  @Get('all-pending-strategic-workload-dc')
  public async getAllPendingStrategicWorkloadDC() {
    return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadDC();
  }

  @Get('all-pending-strategic-workload-dean')
  public async getAllPendingStrategicWorkloadDean() {
    return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadDean();
  }

  @Get('all-pending-strategic-workload-ovpaa')
  public async getAllPendingStrategicWorkloadOVPAA() {
    return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.strategicFunctionWorkloadService.approveWorkload(workloadId);
  }
}
