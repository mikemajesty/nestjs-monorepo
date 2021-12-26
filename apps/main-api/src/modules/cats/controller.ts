import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ICatsRepository } from './adapter';
import { CatDTO } from './entity';
import { Cats } from './schema';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository) {}

  @Post()
  @ApiBody({ type: CatDTO })
  @ApiResponse(SwagggerResponse.save[200])
  async save(model: CatDTO): Promise<Cats> {
    return await this.catRepository.create(model);
  }
}
