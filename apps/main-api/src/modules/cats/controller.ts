import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { ICatsService } from './adapter';
import { CatDTO } from './entity';
import { Cats } from './schema';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catService: ICatsService) {}

  @Post()
  @ApiBody({ type: CatDTO })
  async save(model: CatDTO): Promise<Cats> {
    return await this.catService.create(model);
  }
}
