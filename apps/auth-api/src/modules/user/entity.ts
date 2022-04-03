import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

import { User } from './schema';

export class UserEntity implements User {
  id?: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  login: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  pass: string;
}
