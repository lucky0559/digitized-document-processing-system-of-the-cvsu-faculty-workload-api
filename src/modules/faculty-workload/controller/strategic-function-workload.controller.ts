import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
