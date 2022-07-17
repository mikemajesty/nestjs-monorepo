import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedModel } from 'libs/modules';

import { ICatsRepository } from './adapter';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
@ApiBearerAuth()
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository) {}

  @Post()
  @ApiResponse(SwagggerResponse.save[201])
  @ApiResponse(SwagggerResponse.save[401])
  @ApiResponse(SwagggerResponse.save[500])
  @MessagePattern('monorepo')
  async save(@Payload() body: KafkaMessage): Promise<CreatedModel> {
    return await this.catRepository.create(body);
  }
}
