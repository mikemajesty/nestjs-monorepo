import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedModel } from 'libs/modules';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';

import { ICatsRepository } from './adapter';
import { CatsEntity } from './entity';
import { SwagggerResponse } from './swagger';

@Controller('cats')
@ApiTags('cats')
@ApiBearerAuth()
export class CatsController {
  constructor(private readonly catRepository: ICatsRepository, private readonly secretService: ISecretsService) {}

  @Post()
  @ApiResponse(SwagggerResponse.save[201])
  @ApiResponse(SwagggerResponse.save[401])
  @ApiResponse(SwagggerResponse.save[500])
  async save(@Body() model: CatsEntity): Promise<CreatedModel> {
    const saved = await this.catRepository.create(model);
    return saved;
  }
}
