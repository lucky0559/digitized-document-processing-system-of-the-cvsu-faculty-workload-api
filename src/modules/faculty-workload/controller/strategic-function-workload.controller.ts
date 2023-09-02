import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';
import { StrategicFunctionWorkload } from '../entities/strategic-function-workload.entity';

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
  public async saveStrategicFunctinWorkload(
    @Param('userId') userId: string,
    @Body() strategicFunctionWorkload: any,
  ) {
    return this.strategicFunctionWorkloadService.saveStrategicFunctionWorkload(
      strategicFunctionWorkload,
      userId,
    );
  }

  @Post(':userId/update')
  public async updateStrategicFunctionWorkload(
    @Param('userId') userId: string,
    @Body() strategicFunctionWorkload: any,
  ) {
    return this.strategicFunctionWorkloadService.updateStrategicFunctionWorkload(
      strategicFunctionWorkload,
      userId,
    );
  }

  @Get(':userId/all-pending-strategic-workload-dc')
  public async getAllPendingStrategicWorkloadDC(
    @Param('userId') userId: string,
  ) {
    return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadDC(
      userId,
    );
  }

  @Get(':userId/all-pending-strategic-workload-dean')
  public async getAllPendingStrategicWorkloadDean(
    @Param('userId') userId: string,
  ) {
    return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadDean(
      userId,
    );
  }

  @Get('all-pending-strategic-workload-ovpaa')
  public async getAllPendingStrategicWorkloadOVPAA() {
    return this.strategicFunctionWorkloadService.getAllPendingStrategicWorkloadOVPAA();
  }

  @Patch(':workloadId/approve-workload')
  public async approveWorkload(@Param('workloadId') workloadId: string) {
    return this.strategicFunctionWorkloadService.approveWorkload(workloadId);
  }

  @Patch('ovpaa-approve-workload')
  public async ovpaaApproveWorkload(@Body() remarks: RemarksAndPoints) {
    return this.strategicFunctionWorkloadService.ovpaaApproveWorkload(remarks);
  }

  // @Patch(':workloadId/:remarks/remarks-workload')
  // public async remarksWorkload(
  //   @Param('workloadId') workloadId: string,
  //   @Param('remarks') remarks: string,
  // ) {
  //   return this.strategicFunctionWorkloadService.remarksWorkload(
  //     workloadId,
  //     remarks,
  //   );
  // }

  @Get(':userId/workload-remarks')
  public async getWorkloadRemarksFaculty(@Param('userId') userId: string) {
    return this.strategicFunctionWorkloadService.getWorkloadRemarksFaculty(
      userId,
    );
  }

  @Get(':email/all-pending-workloads')
  public async getAllPendingWorkload(@Param('email') email: string) {
    return this.strategicFunctionWorkloadService.getAllPendingWorkload(email);
  }

  @Get(':userId/:currentProcessRole/all-pending-by-process-role')
  public async getAllPendingWorkloadByIdAndCurrentProcessRole(
    @Param('userId') userId: string,
    @Param('currentProcessRole') currentProcessRole: string,
  ) {
    return this.strategicFunctionWorkloadService.getAllPendingWorkloadByIdAndCurrentProcessRole(
      userId,
      currentProcessRole,
    );
  }

  @Get(':userId/getSavedWorkload')
  public async getSavedWorkload(
    @Param('userId') userId: string,
  ): Promise<StrategicFunctionWorkload> {
    return this.strategicFunctionWorkloadService.getSavedWorkload(userId);
  }
}
