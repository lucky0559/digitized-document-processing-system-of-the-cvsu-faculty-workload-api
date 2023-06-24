import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StrategicFunctionWorkloadService } from '../services/strategic-function-workload.service';
import { RemarksAndPoints } from '../entities/teaching-workload.entity';

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
}
