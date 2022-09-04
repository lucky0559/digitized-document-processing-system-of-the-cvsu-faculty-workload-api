import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
