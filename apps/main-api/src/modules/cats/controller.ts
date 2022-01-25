import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedModel } from 'libs/modules';

import { ICatsRepository } from './adapter';
import { CatsDTO } from './entity';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository) {}

  @Post()
  @ApiResponse(SwagggerResponse.save[201])
  @ApiResponse(SwagggerResponse.save[500])
  async save(@Body() model: CatsDTO): Promise<CreatedModel> {
    const saved = await this.catRepository.create(model);
    return saved;
  }
}
