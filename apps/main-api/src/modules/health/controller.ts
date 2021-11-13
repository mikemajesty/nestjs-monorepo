import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { IHealthService } from './adapter';
import { SwagggerResponse } from './swagger';

@Controller()
@ApiTags('health')
export class HealthController {
  constructor(private readonly healthService: IHealthService) {}

  @Get('/health')
  @ApiResponse(SwagggerResponse.getHealth[200])
  @ApiResponse(SwagggerResponse.getHealth[500])
  async getHealth(): Promise<string> {
    return this.healthService.getText();
  }
}
