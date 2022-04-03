import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ITokenService } from 'libs/modules/auth/token/adapter';
import { ApiException } from 'libs/utils';

import { UserEntity } from '../user/entity';
import { ILoginService } from './adapter';
import { SwagggerResponse } from './swagger';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly loginService: ILoginService, private readonly tokenService: ITokenService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse(SwagggerResponse.login[200])
  @ApiResponse(SwagggerResponse.login[412])
  async login(@Body() entity: UserEntity): Promise<unknown> {
    const user = await this.loginService.login(entity);
    if (!user) throw new ApiException(`username or password is invalid.`, HttpStatus.PRECONDITION_FAILED);
    return this.tokenService.sign({ userId: user.id });
  }
}
