import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ICatsRepository } from './adapter';
import { CatsDTO } from './entity';
import { Cats } from './schema';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository) {}

  @Post()
  @ApiBody({ type: CatsDTO })
  @ApiResponse(SwagggerResponse.save[201])
  async save(model: CatsDTO): Promise<Cats> {
    return await this.catRepository.create(model);
  }
}
