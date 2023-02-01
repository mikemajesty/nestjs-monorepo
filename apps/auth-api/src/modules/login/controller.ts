import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity } from '@/libs/core/entities';
import { ITokenService } from '@/libs/modules/auth/token';

import { ILoginService } from './adapter';
import { SwagggerRequest, SwagggerResponse } from './swagger';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly loginService: ILoginService, private readonly tokenService: ITokenService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse(SwagggerResponse.login[200])
  @ApiResponse(SwagggerResponse.login[412])
  @ApiBody(SwagggerRequest)
  async login(@Body() entity: UserEntity): Promise<unknown> {
    const user = await this.loginService.login(entity);
    return this.tokenService.sign({ userId: user.id });
  }
}
