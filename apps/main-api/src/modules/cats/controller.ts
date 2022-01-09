import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedModel, ICacheService, MainAPICacheKey } from 'libs/modules';

import { ICatsRepository } from './adapter';
import { CatsDTO } from './entity';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository, private readonly cacheService: ICacheService) {}

  @Post()
  @ApiResponse(SwagggerResponse.save[201])
  @ApiResponse(SwagggerResponse.save[500])
  async save(@Body() model: CatsDTO): Promise<CreatedModel> {
    const saved = await this.catRepository.create(model);

    this.cacheService.hSet(MainAPICacheKey.Animals, saved.id, JSON.stringify({ ...model, id: saved.id }));

    return saved;
  }
}
