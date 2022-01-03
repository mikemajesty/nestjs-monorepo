import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedModel } from 'libs/modules/global/database/entity';

import { ICatsRepository } from './adapter';
import { CatsDTO } from './entity';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository) {}

  @Post()
  @ApiResponse(SwagggerResponse.save[201])
  async save(@Body() model: CatsDTO): Promise<CreatedModel> {
    return await this.catRepository.create(model);
  }
}
